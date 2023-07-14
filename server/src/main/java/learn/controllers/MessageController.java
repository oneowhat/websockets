package learn.controllers;

import learn.models.Foo;
import learn.models.SocketMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public MessageController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @PostMapping
    public ResponseEntity<Object> sendMessage(@RequestBody SocketMessage<Foo> socketMessage) {

        simpMessagingTemplate.convertAndSend("/topic/cohorts", socketMessage);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
