from flask import Flask, Response
import facemask_detection
import social_distancing
import cv2
import threading

app = Flask(__name__)

# initialize a lock used to ensure thread-safe
# exchanges of the frames (useful for multiple browsers/tabs
# are viewing tthe stream)
lock = threading.Lock()

# @app.route('/')
# def index():
#     """Video streaming home page."""
#     return render_template('index.html')

def generate(mode='none'):
    global lock
    vc = cv2.VideoCapture(0)

    try:
        if vc.isOpened():
            rval, frame = vc.read()
        else:
            rval = False

        while rval:
            with lock:
                rval, frame = vc.read()
                if frame is None:
                    continue
                
                if mode=='mask':
                    (locs, preds) = facemask_detection.detect_and_predict_mask(frame)
                    frame = facemask_detection.draw_bounding_boxes(locs, preds, frame)
                elif mode=='dist':
                    (people, violate) = social_distancing.check_social_distancing(frame)
                    frame = social_distancing.draw_bounding_boxes(people, violate, frame)
                elif mode=='all':
                    (locs, preds) = facemask_detection.detect_and_predict_mask(frame)
                    frame = facemask_detection.draw_bounding_boxes(locs, preds, frame)
                    (people, violate) = social_distancing.check_social_distancing(frame)
                    frame = social_distancing.draw_bounding_boxes(people, violate, frame)

                (flag, encodedImage) = cv2.imencode(".jpg", frame)

                if not flag:
                    continue

            yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')
    except:
        print('Error Detected')
    finally:
        vc.release()

@app.route('/stream/<mode>')
def stream_mask(mode):
    return Response(generate(mode), mimetype = "multipart/x-mixed-replace; boundary=frame")

if __name__ == '__main__':
   host = "127.0.0.1"
   port = 5000
   debug = False
   options = None
   app.run(host, port, debug, options)
