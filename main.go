package main

import (
	"context"
	"log"
	"net"
	"net/http"
	"os"

	"connectrpc.com/connect"
	"github.com/izumin5210-sandbox/custom-jsx-runtimes/go/proto/tskaigikansai"
	"github.com/izumin5210-sandbox/custom-jsx-runtimes/go/proto/tskaigikansai/tskaigikansaiconnect"
)

func main() {
	httpClient := &http.Client{
		Transport: &http.Transport{
			DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
				return net.Dial("unix", "./tmp/server.sock")
			},
		},
	}

	client := tskaigikansaiconnect.NewLineServiceClient(
		httpClient,
		"http://unix",
	)
	_, err := client.SendHelloMessage(
		context.Background(),
		connect.NewRequest(&tskaigikansai.SendHelloMessageRequest{
			ToId: os.Getenv("LINE_MESSAGE_TO"),
			MentionedUser: &tskaigikansai.User{
				Id: os.Getenv("LINE_USER_ID"),
			},
		}),
	)
	if err != nil {
		log.Println(err)
		return
	}
}
