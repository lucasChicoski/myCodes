#include<stdlib.h>
#include<stdio.h>
#include<time.h>
#include <conio.h>

/*
Produzido por Lucas Chicoski dos Santos.
Versão 1.0
-----------------------------------------links uteis--------------------------------
https://docs.microsoft.com/pt-br/windows-server/administration/windows-commands/xcopy
-------------------------------------------------------------------------------------
Estrutura do tm_time

struct tm {
int tm_sec; //representa os segundos de 0 a 59
int tm_min; //representa os minutos de 0 a 59
int tm_hour; //representa as horas de 0 a 24
int tm_mday: //dia do mês de 1 a 31
int tm_mon; //representa os meses do ano de 0 a 11
int tm_year; //representa o ano a partir de 1900
int tm_wday; //dia da semana de 0 (domingo) até 6 (sábado)
int tm_yday; // dia do ano de 1 a 365
int tm_isdst; //indica horário de verão se for diferente de zero
};


*/

int main(){

	struct tm *dia_da_semana; //inicializa a estrutura
	
	time_t DIA_semana; //cria uma variavel do tipo time_t
	
	time(&DIA_semana); //usando a função time
	 
	  dia_da_semana = localtime(&DIA_semana);/*
	 	A função localtime recebe um tempo em segundos de uma variável do tipo time_t,
	   	converte para o tempo local, armazena os dados na struct e retorna um ponteiro
	    para uma struct do tipo tm com os dados locais.
	  */
	  
	  printf("\nDia..........: %d\n", dia_da_semana->tm_wday);
	   printf("\nDia..........: %d\n", dia_da_semana->tm_hour);
	  
	 //condições para o dia da semana.
	 
	if(dia_da_semana->tm_wday == 0){
		if(dia_da_semana->tm_hour >= 1 && dia_da_semana->tm_hour < 13 ){
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\domingo\\manha/Y");
		}else{
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\domingo\\noite/Y");
		}
		
	}else if(dia_da_semana->tm_wday == 1){
			if(dia_da_semana->tm_hour >= 1 && dia_da_semana->tm_hour < 13 ){
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\2a_feira\\manha/Y");
		}else{
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\2a_feira\\noite/Y");
		}
	}else if(dia_da_semana->tm_wday == 2){
			if(dia_da_semana->tm_hour >= 1 && dia_da_semana->tm_hour < 13 ){
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\3a_feira\\manha/Y");
		}else{
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\3a_feira\\noite/Y");
		}
	}else if(dia_da_semana->tm_wday == 3){
			if(dia_da_semana->tm_hour >= 1 && dia_da_semana->tm_hour < 13 ){
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\4a_feira\\manha/Y");
		}else{
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\4a_feira\\noite/Y");
		}
	}else if(dia_da_semana->tm_wday == 4){
			if(dia_da_semana->tm_hour >= 1 && dia_da_semana->tm_hour < 13 ){
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\5a_feira\\manha/Y");
		}else{
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\5a_feira\\noite/Y");
		}
	}else if(dia_da_semana->tm_wday == 5){
			if(dia_da_semana->tm_hour >= 1 && dia_da_semana->tm_hour < 13 ){
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\6a_feira\\manha/Y");
		}else{
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\6a_feira\\noite/Y");
		}
	}else if(dia_da_semana->tm_wday == 6){
			if(dia_da_semana->tm_hour >= 1 && dia_da_semana->tm_hour < 13 ){
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\sabado\\manha/Y");
		}else{
			system("XCOPY C:\\TabelasDisbat/E/S C:\\BACKUPTabelasDisbat\\sabado\\noite/Y");
		}
	}
	
		system("XCOPY C:\\BACKUPTabelasDisbat/E/S C:\\Users\\Disbat\\OneDrive\\BACKUPPLANILHASDISBAT/Y");
		
	  return 0;
}

