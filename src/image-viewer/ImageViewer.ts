import { Browser, DomNode, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import Button, { ButtonType } from "../button/Button.js";
import Modal from "../modal/Modal.js";
import ImageInfo from "./ImageInfo.js";
import MainImageViewer from "./MainImageViewer.js";
import ThumbnailList from "./ThumbnailList.js";

export default class ImageViewer extends Modal {
  private images: ImageInfo[] = [];
  private currentImageIndex = 0;

  private container: DomNode;
  private imageCounter: DomNode;
  private mainImageViewer: MainImageViewer;
  private thumbnailList: ThumbnailList;

  constructor(options: { images: ImageInfo[]; initialIndex: number }) {
    super(".image-viewer");

    this.images = options.images;
    this.currentImageIndex = options.initialIndex;

    this.append(
      this.container = el(
        ".container",
        el(
          "header",
          el(
            ".button-container.left",
            new Button(".share", {
              type: ButtonType.Icon,
              icon: new AppCompConfig.ShareIcon(),
              onClick: () => this.shareCurrentImage(),
            }),
          ),
          this.imageCounter = el(
            ".image-counter",
            `${this.currentImageIndex + 1} / ${this.images.length}`,
          ),
          el(
            ".button-container.right",
            new Button(".fullscreen", {
              type: ButtonType.Icon,
              icon: new AppCompConfig.FullscreenIcon(),
              onClick: () => this.toggleFullscreen(),
            }),
            new Button(".share", {
              type: ButtonType.Icon,
              icon: new AppCompConfig.ShareIcon(),
              onClick: () => this.shareCurrentImage(),
            }),
            new Button(".close", {
              type: ButtonType.Icon,
              icon: new AppCompConfig.CloseIcon(),
              onClick: () => this.remove(),
            }),
          ),
          { onclick: (event) => event.stopPropagation() },
        ),
        new Button(".prev", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.PrevIcon(),
          onClick: (button, event) => {
            event.stopPropagation();
            this.updateImage(
              this.currentImageIndex <= 0
                ? this.images.length - 1
                : this.currentImageIndex - 1,
              "left",
            );
          },
        }),
        this.mainImageViewer = new MainImageViewer({
          imageUrls: this.images.map((image) => image.imageUrl),
          initialIndex: options.initialIndex,
        }),
        new Button(".next", {
          type: ButtonType.Icon,
          icon: new AppCompConfig.NextIcon(),
          onClick: (button, event) => {
            event.stopPropagation();
            this.updateImage(
              this.currentImageIndex >= this.images.length - 1
                ? 0
                : this.currentImageIndex + 1,
              "right",
            );
          },
        }),
        el(
          ".zoom-controls",
          new Button(".zoom-in", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ZoomInIcon(),
            onClick: () => this.mainImageViewer.zoomIn(),
          }),
          new Button(".zoom-out", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ZoomOutIcon(),
            onClick: () => this.mainImageViewer.zoomOut(),
          }),
          new Button(".reset-zoom", {
            type: ButtonType.Icon,
            icon: new AppCompConfig.ResetZoomIcon(),
            onClick: () => this.mainImageViewer.resetZoom(),
          }),
          { onclick: (event) => event.stopPropagation() },
        ),
        el(
          "footer",
          this.thumbnailList = new ThumbnailList({
            thumbnailUrls: options.images.map((image) => image.thumbnailUrl),
            initialIndex: options.initialIndex,
          }),
        ),
      ),
    );

    this.mainImageViewer.onDom("click", (event) => event.stopPropagation());
    this.thumbnailList.onDom("click", (event) => event.stopPropagation());
    this.thumbnailList.on(
      "thumbnailSelected",
      (index) => this.updateImage(index),
    );
  }

  private shareCurrentImage() {
    const image = this.images[this.currentImageIndex];
    Browser.share({ title: "Shared Image", url: image.imageUrl });
  }

  private toggleFullscreen() {
    if (!Browser.isFullscreen()) {
      Browser.enterFullscreen(this.container);
    } else {
      Browser.exitFullscreen();
    }
  }

  private updateImage(
    imageIndex: number,
    transitionDirection?: "left" | "right",
  ) {
    this.mainImageViewer.updateImage(imageIndex, transitionDirection);
    this.currentImageIndex = imageIndex;
    this.imageCounter.text = `${imageIndex + 1} / ${this.images.length}`;
    this.thumbnailList.selectThumbnail(imageIndex);
  }
}
