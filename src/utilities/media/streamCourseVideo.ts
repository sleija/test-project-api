import request from 'request'
import { Response } from 'express'

let start, end

interface ResponseHeaders {
  [x: string]: number
}

export interface RequestResponse {
  headers: ResponseHeaders
}

export default function streamCourseVideo(videoURL: string, range: string, res: Response): void {
  if (videoURL) {
    const videoExt = videoURL.split('.').pop()
    request(
      {
        url: videoURL,
        method: 'HEAD',
      },
      (_: never, response: RequestResponse) => {
        setResponseHeaders(response.headers, range, videoExt, res)
        pipeToResponse(videoURL, res)
      }
    )
  }
}

export function setResponseHeaders(
  headers: ResponseHeaders,
  range: string,
  videoExt: string,
  res: Response
): void {
  const positions = range.replace(/bytes=/, '').split('-')
  const total = headers['content-length']
  start = parseInt(positions[0], 10)
  end = positions[1] ? parseInt(positions[1], 10) : total - 1
  const chunksize = end - start + 1

  res.writeHead(206, {
    'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': `video/${videoExt}`,
  })
}

export function pipeToResponse(videoURL: string, res: Response): void {
  const options = {
    url: videoURL,
    headers: {
      range: 'bytes=' + start + '-' + end,
      connection: 'keep-alive',
    },
  }

  request(options).pipe(res)
}
