package notification

type Notification struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Time    string `json:"time"`
}
