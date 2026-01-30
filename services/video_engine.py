import cv2

def extract_video_signals(path):
    signals = []
    cap = cv2.VideoCapture(path)

    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if frame_count < 30:
        signals.append("temporal_artifacts")

    return signals
