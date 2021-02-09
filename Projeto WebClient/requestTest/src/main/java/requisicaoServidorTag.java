import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

public class requisicaoServidorTag {

    public void TagRequisicao() {

        certificates certifCates = new certificates();
        String login = "mla\\gmenegue";
        String senha = "Mosaic@2021";
        String AuthAutorization = login + ":" + senha;

        String TAGCorreta = null;
        try {
            //gerando a data atual

            DateFormat formatador = new SimpleDateFormat("yyyy-MM-dd");
            Date data = new Date();
            String dataAtual = formatador.format(data);
            String startTime = "startTime=" + dataAtual + "%2000:00&";
            String endTime ="endTime=" + dataAtual + "%2023:00";


            String startTimeBD = dataAtual + " # 00:00";
            String endTimeBD = dataAtual + " # 23:00";

            certifCates.certificateS();
            URL url = new URL("https://pivision.mosaicco.com/piwebapi/dataservers/F1DSJNMH3B1lQke4iGxscSM3VgQlJDTVRTUlYxMQ/points?selectedFields=Items.WebId;Items.Name;Items.Path;Items.Descriptor;Items.PointType&maxCount=10000");

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            String AuthCode = Base64.getEncoder().encodeToString((AuthAutorization).getBytes("UTF-8"));
            String authHeaderValue = "Basic " + new String(AuthCode);
            connection.setRequestProperty("Authorization", authHeaderValue);

            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();

            if(responseCode == 200){
                System.out.println("Answer of request: "+responseCode+"OK"+ " successful");
            }else{
                System.out.println("Answer of request: "+responseCode+"Not OK"+ " fail");
            }


            InputStream content = (InputStream) connection.getInputStream();
            BufferedReader in = new BufferedReader(new InputStreamReader(content));

            String line;
            line = in.readLine();

          //  System.out.println(line);

            //----------------------------------------------------tratandoJSON------------------------------

            JSONObject jsonObject = new JSONObject(line);
            //JSONObject itens = jsonObject.getJSONObject("Timestamp");
            JSONArray arrItens = jsonObject.getJSONArray("Items");

            String[] NameTag = new String[arrItens.length()];
            String[] WEBID = new String[arrItens.length()];


            int tamanho = arrItens.length();

            //Implementado
            LeitorArq leArquivo = new LeitorArq();
            String[] linhaTagsTxT = leArquivo.leitor();

            String enderecoRequiscao = "";

            System.out.println("Wait till finish the process. Please don't turn off :)");
            for (int h = 0; h < leArquivo.contLinha; h++) {
                for (int i = 0; i < arrItens.length(); i++) {

                    JSONObject TagItem = arrItens.getJSONObject(i);
                    //  System.out.println("WebID:" + TagItem.getString("WebId"));

                    NameTag[i] = TagItem.getString("Name");
                    WEBID[i] = TagItem.getString("WebId");

                    if (linhaTagsTxT[h].equals(NameTag[i])) {
                         System.out.println("Tag found: " + linhaTagsTxT[h]);
                        //enderecoRequiscao = "https://pivision.mosaicco.com/piwebapi/streams/" + WEBID[i] + "/" + "interpolated?" + startTime + endTime  + "&interval=5m";
                        enderecoRequiscao = "https://pivision.mosaicco.com/piwebapi/streams/" + WEBID[i] + "/" + "interpolated?" + startTime + "interval=1h";
                        URL urlStream = new URL(enderecoRequiscao);
                        HttpURLConnection connectionStream = (HttpURLConnection) urlStream.openConnection();
//startTime=2020-12-25%2000:00&endTime=2020-12-25%2012:00  --  startTime + endTime
                        connectionStream.setRequestProperty("Authorization", authHeaderValue);
                        connectionStream.setRequestMethod("GET");

                        InputStream contentStream = (InputStream) connectionStream.getInputStream();
                        BufferedReader inStream = new BufferedReader(new InputStreamReader(contentStream));

                        String lineStream;
                        lineStream = inStream.readLine();

                        JSONObject jsonObjectStream = new JSONObject(lineStream);
                        JSONArray arrItensStream = jsonObjectStream.getJSONArray("Items");

                        String[] Valor = new String[arrItensStream.length()];

                        for(int g = 0;g<arrItensStream.length();g++){
                            JSONObject TagItemStream = arrItensStream.getJSONObject(g);

                            Valor[g] = String.valueOf(TagItemStream.getFloat("Value"));


                            //conexão com o banco
                            BDconnection conn = new BDconnection();
                            Connection conect = conn.getConnection();

                            String sql = "INSERT INTO pims_inf(valor, dat_hor_in, dat_hor_fim, tag, Timestamp) VALUES(? ,? ,? ,? ,?)";
                            PreparedStatement stm = conect.prepareStatement(sql);

                            stm.setFloat(1,TagItemStream.getFloat("Value") );
                            stm.setString(2,startTimeBD);
                            stm.setString(3,endTimeBD);
                            stm.setString(4,linhaTagsTxT[h]);
                            stm.setString(5,TagItemStream.getString("Timestamp"));

                            stm.execute();
                            conn.closeDataBaseConnection();

                        }
                    }
                }
            }


        } catch (Exception e) {
            e.getStackTrace();
        }

    }

}
