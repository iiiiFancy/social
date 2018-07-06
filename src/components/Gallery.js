import React, { Component }from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';

export class Gallery extends Component {
    static propTypes = { // prop type check
        images: PropTypes.arrayOf( // image是一个array
            PropTypes.shape({ // 其中元素必须有以下props
                user: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired,
                caption: PropTypes.string,
                thumbnailWidth: PropTypes.number.isRequired,
                thumbnailHeight: PropTypes.number.isRequired
            })
        ).isRequired
    }

    render() {
        const images = this.props.images.map((image) => {
            return {
                ...image,
                customOverlay: (
                    <div style={captionStyle}>
                        {/*图片下方显示的文字*/}
                        <div>{`${image.user}: ${image.caption}`}</div>
                    </div>
                ),
            };
        });

        return (
            <div style={wrapperStyle}>
                <GridGallery
                    backdropClosesModal
                    images={images}
                    enableImageSelection={false}/>
            </div>
        );
    }
}


const wrapperStyle = {
    display: "block",
    minHeight: "1px",
    width: "100%",
    border: "1px solid #ddd",
    overflow: "auto"
};

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

