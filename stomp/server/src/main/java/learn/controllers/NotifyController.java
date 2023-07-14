package learn.controllers;

import learn.models.Foo;
import learn.models.SocketMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotifyController {

    @MessageMapping("/update-associate-assessment")
    @SendTo("/topic/cohorts")
    public SocketMessage<Foo> send(@Payload SocketMessage<Foo> message) {
        return message;
    }
}
