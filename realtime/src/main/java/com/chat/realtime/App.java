package com.chat.realtime;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.chat.realtime.config.Msg;


@Controller
public class App {

    @MessageMapping("/chatmessage")
    @SendTo("/chat")
    public Msg sendMessage(Msg message){
        
        return message;
    }
}
