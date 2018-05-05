import React, { Component } from 'react'
import { ImageBackground, Image } from 'react-native'
import FastImage from 'react-native-fast-image'

export default class PlacehoderImage extends Component {
    constructor() {
        super();
        this.state = {
            mDidLoad: false,
        }
    }
    render() {
        const { placeholder, style } = this.props;
        if (placeholder) {
            return (
                <ImageBackground
                    source={this.state.mDidLoad ? {visibility: 'hidden'} : placeholder}
                    resizeMode={FastImage.resizeMode.center}
                    style={{width: style.width, height: style.height}}
                    >
                    {this._renderImage()}      
                </ImageBackground>
            )
        } else {
            return this._renderImage();
        }
    }

    _renderImage = () => {
        const {source, style, resizeMode } = this.props;
        const ImageType = source.uri.indexOf('http') < 0 ? Image : FastImage;
        return (
            <ImageType 
                source={source}
                resizeMode={resizeMode || FastImage.resizeMode.cover}
                style={style}

                onLoadStart={this._onLoadStart}
                onProgress={this._onProgress}
                onLoad={this._onLoad}
                onError={this._onError}
                onLoadEnd={this._onLoadEnd}
                onLayout={this._onLayout}
            />
        )
    }

    _onLoadStart = () => {
        const { onLoadStart } = this.props;
        onLoadStart && onLoadStart();
    }

    _onProgress = () => {
        const { onProgress } = this.props;
        onProgress && onProgress();   
    }

    _onLoad = () => {
        this.setState({
            mDidLoad: true,
        })
        const { onLoad } = this.props;
        onLoad && onLoad();
    }

    _onError = () => {
        const { onError } = this.props;
        onError && onError();
    }

    _onLoadEnd = () => {
        const { onLoadEnd } = this.props;
        onLoadEnd && onLoadEnd();
    }

    _onLayout = () => {
        const { onLayout } = this.props;
        onLayout && onLayout();
    }
}