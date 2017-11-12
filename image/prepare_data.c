#include <stdio.h>

int main() {
	FILE* s = fopen("./pain_data", "r");
	int i = 0;

	printf("0 ");
	while(1 == 1) {
		unsigned char curr_c = fgetc(s);
		if(curr_c == ',') {
			i = i+1;
			printf("\n%i ", i);
		} else {
			if(curr_c == '\n') {
				printf("\n");
				return 0;
			} else {
				printf("%c", curr_c);
			}
		}
	}
}
