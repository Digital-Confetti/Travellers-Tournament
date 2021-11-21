package digitalconfetti.TT.server;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import digitalconfetti.TT.server.Items.Conmutron;
import digitalconfetti.TT.server.Items.Message;

@RestController
@RequestMapping(value = "/get/")
public class MessageController {

	Conmutron conmutron;
	
	//POST->Player
	@PostMapping()
	public String postlayer(@RequestBody String name)
	{
		//TODO Conmutron.addPlayer(name);
		return name;
	}
	
	//POST->Mensaje
	@PostMapping("{lobby}")
	public ResponseEntity<Boolean> postMessage(@RequestBody Message message, @PathVariable("lobby") String lobby){
		//TODO Conmutron.newMessage(message)
		return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
	}
}
