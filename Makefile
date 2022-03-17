CC = g++
FILE=main
OBJS=-lopencv_imgcodecs -lopencv_imgproc -lopencv_videoio -lopencv_core -lopencv_imgproc -lopencv_highgui -lXtst -lX11 -lm
LIBS=-L /usr/local/lib/
INCLUDES=-I /usr/local/include/opencv4/ -I /usr/include/X11/ 

main:
	$(CC) $(FILE).cpp $(INCLUDES) $(LIBS) $(OBJS) -o $(FILE).out

test:
	rm -f main.out
	rm -f imgs/*.jpg
	make
	./$(FILE).out