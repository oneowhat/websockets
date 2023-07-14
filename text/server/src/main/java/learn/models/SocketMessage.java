package learn.models;

public class SocketMessage<T> {

    private MessageType type;
    private T payload;

    public SocketMessage() { }

    public SocketMessage(MessageType type, T payload) {
        this.type = type;
        this.payload = payload;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }
}
