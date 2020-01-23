//========================BIBLIOTECAS=============
#include <ncurses.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
//======================== VARIÁVEIS GLOBAIS =============

int posiX = 14;
int posiY = 15;

int randX;
int randY;

int posiCaldaX;
int posiCaldaY;

int pontuacao = 0;
//======================= DECLARAÇÃO DE FUNÇÕES ===========
int mapa();
int inicializarTela();
int movimentoPlayer();
int gerarPontosNoMapa();
int player();

/*Criar uma função para crescer a calda da cobrinha*/


//======================= FUNÇÃO PRINCIPAL ================
int main(){
	initscr();
	srand(time(NULL));

	int ComandO;
	
	gerarPontosNoMapa();

	while((ComandO = getch()) != 'q'){

		inicializarTela();
		mvprintw(2, 55, "SNAKE");
		mvprintw(3, 55, "Pontos: %d",pontuacao);
		movimentoPlayer(ComandO);
		mapa();

		printw("Posicao atual da cobra. Coluna:%d Linha:%d\n",posiX, posiY); // similar ao printf
		mvprintw(4,52,"CaldaX:%d CaldaY:%d",posiCaldaX,posiCaldaY);
		mvprintw(5,52,"randX:%d randY:%d",randX,randY);
//		player(ComandO);
		if(posiX == randX && posiY == randY ){
			gerarPontosNoMapa();
			pontuacao = pontuacao + 1;
		}
	}

	

	endwin();

}

//==========MAPA=====================================
int mapa (){
	//parede direita
	for(int linha = 1; linha < 21; linha++){
		mvprintw( linha, 13, "%c",186);		
	}

	mvprintw( 1, 13, "%c",201); // quina superior esqerda

	//parede inferior
	for (int coluna = 14; coluna < 50; coluna++)
	{
		mvprintw( 20, coluna, "%c",205);
	}

	mvprintw( 20, 13, "%c",200);// quina inferior esquerda

	//parede superior
	for (int coluna = 14; coluna < 50; coluna++)
	{
		mvprintw( 1, coluna, "%c",205);
	}

	mvprintw( 20, 50, "%c",188);// quina inferior direita

	//parede direita
	for (int linha = 1; linha < 20; linha++)
	{
		mvprintw( linha,50 , "%c",186);
	}

	mvprintw( 1, 50, "%c",187);// quina superior direita

}

//================== INICIALIZAÇÃO DA TELA ===================
int inicializarTela(){
	initscr();
	refresh();
	noecho();
}

//================	MOVIMENTAÇÃO DO PERSONAGEM ===============
int movimentoPlayer(int comando){
//W - cima - movimento no eixo Y
	if (comando == 119){
		posiY = posiY - 1;
		mvprintw(posiY ,posiX , "%c" , 254);
		move(posiY,posiX);
/*------------------------------------------------------------*/
	if(posiY == randY && posiX == randX)
		{
			//mvprintw(posiY + 1 ,posiX , "%c" , 254);
			posiCaldaY = posiY + 1;
			posiCaldaX = posiX;
			mvprintw(posiCaldaY ,posiCaldaX , "%c" , 254);
		}else{
			if(pontuacao > 0){
				posiCaldaY = posiCaldaY - 1;
			//	mvprintw(posiCaldaY ,posiCaldaX , "%c" , 254);
			//	mvprintw(posiCaldaY - 1,posiCaldaX, " ");	
			}
			mvprintw(posiY + 1,posiX, " ");
		}

	
		refresh();
	}
//D - direita - movimento no eixo X
	if (comando == 100){
		posiX = posiX + 1;
		mvprintw(posiY ,posiX ,"%c" , 254);
		move(posiY,posiX);

		if(posiX == randX && posiY == randY ){
			mvprintw(posiY ,posiX - 1, "%c" , 254);
			
		}else{
			mvprintw(posiY ,posiX - 1, " ");
		}
		
		refresh();	
	}

//A - esquerda - movimento no eixo X
	if (comando == 97){
		posiX = posiX - 1;
		mvprintw(posiY ,posiX ,"%c" , 254);
		mvprintw(posiY ,posiX + 1, " ");
		move(posiY,posiX);
		refresh();	
	}

//S - baixo - movimento no eixo Y
	if (comando == 115){
		posiY = posiY + 1;
		mvprintw(posiY ,posiX , "%c" , 254);
		move(posiY,posiX);
		mvprintw(posiY - 1,posiX, " ");
		refresh();
	}
}

int gerarPontosNoMapa(){

	int Yrand; // Y
	int Xrand; // X

	Yrand = 2 + (rand()) % 17 ;
	Xrand = 14 + (rand()) % 35;

	randY = Yrand;
	randX = Xrand;

	mvprintw(Yrand, Xrand,"%c",248);
	noecho();
}
int player(int comando){

	

}

/*

if(posiX != randX && posiY != randY ){
		

		}

*/


