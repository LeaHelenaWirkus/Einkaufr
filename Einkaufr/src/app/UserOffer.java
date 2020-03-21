public class UserOffer{
    private long id;
    private long timestamp;
    private long coordinate;
    private String status;
    private String[] list;

  public UserOffer(long id, long timestamp, long coordinate, String status, String[] list) {
    this.id = id;
    this.timestamp = timestamp;
    this.coordinate = coordinate;
    this.status = status;
    this.list = list;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public long getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(long timestamp) {
    this.timestamp = timestamp;
  }

  public long getCoordinate() {
    return coordinate;
  }

  public void setCoordinate(long coordinate) {
    this.coordinate = coordinate;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String[] getList() {
    return list;
  }

  public void setList(String[] list) {
    this.list = list;
  }

}
