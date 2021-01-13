import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

//usando Thread


public class Run_date {
    public static void main(String[] args) throws InterruptedException {


        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm");
        String date2 =  simpleDateFormat.format(date);
        System.out.println("Hora atual: " + date2);




        new Thread(thread2).start();
        new Thread(thread).start();

    }

    private static Runnable thread = new Runnable() {
        @Override
        public void run() {
                System.out.println("Hello world");
        }
    };
    private static Runnable thread2 = new Runnable() {
        @Override
        public void run() {
            for(int i = 0; i<10; i++){
                try {
                    System.out.println(i++);
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    };

}
