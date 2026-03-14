import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessageToRoom')
  handleMessage(
    @MessageBody() data: { roomName: string; message: string; sender: string },
  ): void {
    // Emit the message to all clients in the specified room, including the sender
    this.server.to(data.roomName).emit('msgToClient', {
      sender: data.sender,
      message: data.message,
      room: data.roomName,
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { roomName: string; userId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(data.roomName);
    // Optional: Notify other clients in the room that a new user has joined
    client
      .to(data.roomName)
      .emit(
        'userJoined',
        `${data.userId} has joined the room ${data.roomName}`,
      );
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { roomName: string; userId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(data.roomName);
    client
      .to(data.roomName)
      .emit('userLeft', `${data.userId} has left the room ${data.roomName}`);
  }
}
