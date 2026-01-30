from pydub import AudioSegment

def extract_audio_signals(path):
    signals = []
    audio = AudioSegment.from_file(path)

    if audio.channels > 1:
        signals.append("audio_splice")

    return signals
