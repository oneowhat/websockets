package learn.controllers;

import learn.models.Foo;
import learn.models.SocketMessage;
import learn.notification.SocketHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController {

    private final SocketHandler socketHandler;

    public MessageController(SocketHandler socketHandler) {
        this.socketHandler = socketHandler;
    }

    @PostMapping
    public ResponseEntity<Object> sendMessage(@RequestBody SocketMessage<Foo> socketMessage) throws IOException {


        socketHandler.broadcast(socketMessage);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
