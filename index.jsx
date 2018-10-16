import React, { Component } from 'react'

import HLS from 'hls.js'

export default class HLSPlayer extends Component {
  constructor (props) {
    super(props)
    if (!HLS.isSupported()) {
      console.warn(`HLS.js is not supported in this browser. Trying native HLS.`)
      this.state = {
        nativeHLS: true
      }
      return
    }

    let hls = new HLS()

    console.log(hls)

    this.state = {
      hls
    }
  }

  play () {
    this.refs.video.play()
  }

  pause () {
    this.refs.video.pause()
  }

  componentDidMount () {
    if (this.state.nativeHLS && this.refs.video.canPlayType('application/vnd.apple.mpegurl')) {

    } else {
      this.state.hls.loadSource(this.props.src)
      this.state.hls.attachMedia(this.refs.video)
      this.state.hls.on(HLS.Events.MANIFEST_PARSED, function () {
        this.refs.video.play()
      })
    }

    this.refs.video.ontimeupdate = () => this.props.ontimeupdate(this.refs.video.currentTime, this.refs.video.duration)
    this.refs.video.onprogress = (e) => this.props.onloadedupdate(e)
  }
  render () {
    return (
      <div className='hlsplayer'>
        <video ref='video' />
      </div>
    )
  }
}
