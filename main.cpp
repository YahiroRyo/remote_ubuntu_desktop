// g++ main.cpp -I /usr/local/include/opencv4/ -I /usr/include/X11/ -L /usr/local/lib/ -o main.out -lopencv_imgcodecs -lopencv_imgproc -lopencv_videoio -lopencv_core -lopencv_imgproc -lopencv_highgui -lX11 -lm

#include <opencv2/opencv.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/videoio.hpp>
#include <opencv2/core/core.hpp>
#include <X11/Xlib.h>
#include <X11/Xutil.h>
#include <X11/X.h>
#include <X11/Intrinsic.h>
#include <X11/extensions/XTest.h>
#include <iostream>
#include <unistd.h>
#include <string>
#include <vector>

const float SLEEP_MINUTES = 0.0625 * 1000000;

struct Vector2 {
  public:
    int x;
    int y;
    Vector2(int x, int y) {
      this->x = x;
      this->y = y;
    }
};

int main(int argc, char *const argv[]) {
  Display* d = XOpenDisplay(NULL);
  Screen* s = DefaultScreenOfDisplay(d);
  int sw = 1920;
  int sh = s->height;
  Window w = DefaultRootWindow(d);
  std::vector<std::string> keys{ "t", "e", "s", "t"};
  std::vector<Vector2> cursor_poses{ Vector2(0, 0), Vector2(100, 100) };
  bool once = true;

  while(once) {
    once = false;
    for (int i = 0; i < 16; i++) {
      std::vector<std::uint8_t> pixels;

      XImage* x_img = XGetImage(d, w, 1920, 0, sw, sh, AllPlanes, ZPixmap);
      int bits_per_pixel = x_img->bits_per_pixel;
      pixels.resize(sw * sh * 4);
      memcpy(&pixels[0], x_img->data, pixels.size());
      XDestroyImage(x_img);

      cv::Mat img = cv::Mat(cv::Size(sw, sh), bits_per_pixel > 24 ? CV_8UC4 : CV_8UC3, &pixels[0]);
      usleep(SLEEP_MINUTES);
      cv::imwrite("imgs/" + std::to_string(i) + ".jpg", img);

      if (keys.size() > i) {
        std::string s;
        KeyCode code = XKeysymToKeycode(d, XStringToKeysym(keys[i].c_str()));
        XTestFakeKeyEvent(d, code, True, 0);
        XTestFakeKeyEvent(d, code, False, 0);
        XFlush(d);
      }

      if (cursor_poses.size() > i) {
        XWarpPointer(d, None, w, 0, 0, 0, 0, cursor_poses[i].x, cursor_poses[i].y);
        XFlush(d);
      }
    }
  }
  XCloseDisplay(d);

  return 0;
}