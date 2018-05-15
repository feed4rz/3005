class Entity {
  constructor(renderer, texture_path, x = 0, y = 0, w = 0, h = 0, a = 0) {
    if(!texture_path) throw 'Please, provide valid texture path'
    if(!(renderer instanceof Renderer)) throw 'Please, pass valid Renderer class'

    /* Canvas */
    this.renderer = renderer

    /* Entity id */
    this.id = Date.now()

    /* Entity position */
    this.x = x
    this.y = y
    this.a = a

    /* Rectangular texture */
    this.texture = new Image()
    this.texture.src = texture_path

    /* Rectangular size */
    this.w = w
    this.h = h

    /* Self push */
    this.renderer.entities.push(this)
  }

  tick() {
    this.renderer.ctx.save()

    this.renderer.ctx.translate(this.x + this.w / 2, this.y + this.h / 2)

    this.renderer.ctx.rotate(this.a / 180 * Math.PI)

    this.renderer.ctx.translate(-this.w / 2, -this.h / 2)

    this.renderer.ctx.drawImage(this.texture, 0, 0, this.w, this.h)

    this.renderer.ctx.restore()
  }

  remove() {
    const index = this.renderer.entities.indexOf(this)

    this.renderer.entities.splice(index, 1)
  }
}
class Renderer {
  constructor(canvas, w = 600, h = 400, frames = 60) {
    if(!canvas) throw 'No canvas has been passed'

    /* Canvas */
    this.ctx = canvas.getContext('2d')

    /* Size */
    this.width = w
    this.height = h

    /* Rendering */
    this.frames = frames

    /* Entities */
    this.entities = []

    setInterval(() => {
      this.tick()
    }, 1000 / this.frames)
  }

  /* 1 frame */
  tick() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.entities.forEach(entity => { entity.tick() })
  }
}