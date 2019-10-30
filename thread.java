import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import javax.swing.JOptionPane;

class ler extends Thread{
	String requestURL;
	String fileName;
	public ler(String request, String file) {
		this.requestURL = request;
		this.fileName = file;
	}
	public void run() {
		fileName = "/home/lucas/TRABALHO/" + fileName;
	    try (BufferedInputStream in = new BufferedInputStream(new URL(requestURL).openStream());
	        FileOutputStream fileOutputStream = new FileOutputStream(fileName)) {
	      byte dataBuffer[] = new byte[1024];
	      int bytesRead;
	      while ((bytesRead = in.read(dataBuffer, 0, 1024)) != -1) {
	        fileOutputStream.write(dataBuffer, 0, bytesRead);
	      }
	    } catch (IOException e) {
	      // n�o faz nada
	    }
	}
	
 }

class map1{
  public  Map<String, String> ObterLista() {
		Map<String, String> dir = new HashMap<String, String>();
		dir.put("https://pt.wikipedia.org/wiki/Engenharia_de_software", "Engenharia_de_software.doc");
		dir.put("https://pt.wikipedia.org/wiki/Banco_de_dados", "Banco_de_dados.doc");
		dir.put("https://pt.wikipedia.org/wiki/Engenharia_de_requisitos", "Engenharia_de_requisitos.doc");
		dir.put("https://pt.wikipedia.org/wiki/Linguagem_de_programa%C3%A7%C3%A3o", "Linguagem de Programacao.doc");
		dir.put("https://pt.wikipedia.org/wiki/Java", "Java");
		dir.put("https://pt.wikipedia.org/wiki/Ger%C3%AAncia_de_projetos", "Ger�ncia de projetos.doc");
		dir.put("https://pt.wikipedia.org/wiki/Seguran%C3%A7a_da_informa%C3%A7%C3%A3o", "Seguran�a da Informa��o.doc");
		dir.put("https://pt.wikipedia.org/wiki/CMMI", "CMMI.doc");
		dir.put("https://pt.wikipedia.org/wiki/Intelig%C3%AAncia_artificial", "Intelig�ncia Artificial.doc");
		dir.put("https://pt.wikipedia.org/wiki/Filosofia_da_ci%C3%AAncia", "Filosofia da Ci�ncia.doc");
		dir.put("https://pt.wikipedia.org/wiki/Banco_de_dados_distribu%C3%ADdo", "Bancos de Dados Distribu�do.doc");
		dir.put("https://pt.wikipedia.org/wiki/Rede_neural_artificial", "Rede neural artificial.doc");
		dir.put("https://pt.wikipedia.org/wiki/Rede_de_computadores", "Rede de Computadores.doc");
		dir.put("https://pt.wikipedia.org/wiki/TCP/IP", "TCP-IP.doc");
		dir.put("https://pt.wikipedia.org/wiki/Hadoop", "Hadoop.doc");
        dir.put("https://pt.wikipedia.org/wiki/Multiprocessamento#targetText=Multiprocessamento%20é%20o%20uso%20de,de%20alocar%20tarefas%20entre%20eles.", "Multiprocessamento.doc");
        dir.put("https://pt.wikipedia.org/wiki/Memória_de_acesso_aleatório", "Memória de acesso aleatorio.doc");
        dir.put("https://pt.wikipedia.org/wiki/Implementação_de_software", "Implementação de software.doc");
        dir.put("https://pt.wikipedia.org/wiki/OpenCV", "Opencv.doc");
        dir.put("https://pt.wikipedia.org/wiki/Visão_computacional", "Visao computacional.doc");
        dir.put("https://pt.wikipedia.org/wiki/Sistema_de_visão", "https://pt.wikipedia.org/wiki/Sistema_de_visão.doc");
        dir.put("https://pt.wikipedia.org/wiki/Computação_gráfica", "Computação grafica.doc");
        dir.put("https://pt.wikipedia.org/wiki/Ciência_de_dados", "Ciencia de dados.doc");
        dir.put("https://pt.wikipedia.org/wiki/Rede_neural_artificial", "Rede neural artificial.doc");
        dir.put("https://pt.wikipedia.org/wiki/Neurociência_computacional", "Neurociencia computacional.doc");
                
		return dir;
	}
}




public class thread extends Thread {
	public static void main(String[] args) throws IOException {
			
		JOptionPane.showMessageDialog(null, "Atenção");
		
		ThreadPoolExecutor executorService = null;
		ThreadPoolExecutor pool = (ThreadPoolExecutor) executorService;
		long start_time = System.nanoTime();
		Date dtInicio = new Date(start_time);
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		System.out.println("==============================================================================");
		System.out.println("INÍCIO: " + dateFormat.format(dtInicio));
		System.out.println("");
		
		//Map<String, String> lista = ObterLista();
		map1 mapa = new map1();
		Map<String, String> lista = mapa.ObterLista();
		
		ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(100);
		
		for (String url : lista.keySet()) {
			String arq = lista.get(url);
			ler lerArq = new ler(url, arq);
			//lerArq.start();
			executor.execute(lerArq);
			
			System.out.println(url);
			System.out.println(arq);
			System.out.println("");			
		}
		executor.shutdown();

		// readStringFromURL("https://pt.wikipedia.org/wiki/Engenharia_de_software", "engenharia_de_software.doc");
		
		System.out.println("");
		Date dtFinal = new Date(start_time);
		System.out.println("FINAL: " + dateFormat.format(dtFinal));
		long end_time = System.nanoTime();
		double difference = (end_time - start_time) / 1e6;
		System.out.println("TOTAL MILISSEGUNDOS: " + difference);
		System.out.println("==============================================================================");
	}
}