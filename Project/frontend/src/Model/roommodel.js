export class Room {
    constructor(roomtype = String, RoomPricePerDay = Int32Array, RoomImage = String,RoomDescription = String , AvailabilityStatus = String , RoomServantName = String ,servantContact = Int32Array)
    {
        this.roomtype = roomtype;
        this.RoomPricePerDay = [RoomPricePerDay];
        this.RoomImage = RoomImage;
        this.RoomDescription = RoomDescription ;
        this.AvailabilityStatus = AvailabilityStatus ;
        this.RoomServantName = RoomServantName ;
       this.servantContact = servantContact   
    }
  }