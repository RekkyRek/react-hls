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

    this.state = {
      hls
    }
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
  }
  render () {
    return (
      <div className='hlsplayer'>
        <video ref='video' controls />
      </div>
    )
  }
}
