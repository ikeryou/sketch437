import { Color, Vector3 } from "three";
import { MyDisplay } from "../core/myDisplay";
import { Util } from "../libs/util";
import { Tween } from "../core/tween";
import { Func } from "../core/func";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _allStr: Array<string> = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
  // private _allStr: Array<string> = ['A']
  private _items: Array<HTMLElement> = []
  private _noise: Vector3 = new Vector3(0, 0, 0)
  private _useStr: string = ''
  private _useBlankStr: string = ''
  private _isHover: boolean = false
  private _defCol: Array<Color> = []

  constructor(opt:any) {
    super(opt)

    this._c = opt.key * 1

    this._useStr = Util.randomArr(this._allStr)
    this._useBlankStr = Util.randomArr(['', '_', '=', '酒'])

    this._noise.x = Util.random(5, 10) * 0.5
    this._noise.y = Util.random2(1, 20)
    // this._noise.x = 5
    // this._noise.y = 0

    const colRand = Util.hit(5) ? 1 : Util.randomInt(2, 10)

    const line = Util.random(0.5, 1)
    let size = Func.val(Util.random(0.5, 1.5) * 10, Util.random(0.5, 1.5) * 4)
    if(Util.hit(20)) size = 20

    const num = Func.val(Util.randomInt(2, 10), Util.randomInt(2, 13))
    for (let i = 0; i < num; i++) {
      const div = document.createElement('div')
      div.classList.add('js-item-txt')
      this.el.appendChild(div)
      this._items.push(div)

      const peakCol = new Color(0,0,0)
      peakCol.offsetHSL(Util.random(0, 1), 1, 0.5)

      const fontCol = new Color(Util.hit(colRand) ? peakCol.getStyle() : 0xffffff)

      this._defCol.push(fontCol)

      div.style.color = fontCol.getStyle()
      div.style.lineHeight = line + ''
      div.style.fontSize = size + 'vw'

      this.useGPU(div)
    }

    this._setHover()
  }

  //
  protected _eRollOver() {
    this._isHover = true
  }


  //
  protected _eRollOut() {
    this._isHover = false
  }

  protected _update():void {
    super._update();

    // const mx = MousePointer.instance.easeNormal.x

    this._items.forEach((el:HTMLElement, i:number) => {
      const rad = Util.radian(this._c * this._noise.x + i * this._noise.y)
      const d = Util.map(Math.sin(rad), 1, this._items.length - 1, -1, 1)
      if(this._isHover) {
        el.innerHTML = d >= i ? Util.randomArr(this._allStr) : this._useBlankStr

        const peakCol = new Color(0,0,0)
        peakCol.offsetHSL(Util.random(0, 1), 1, 0.5)
        Tween.set(el, {
          backgroundColor: peakCol.getStyle(),
          color: '#000',
          lineHeight: Util.map(Math.cos(rad * 2), 0.25, 0.75, -1, 1),
        })
      } else {
        el.innerHTML = d >= i ? this._useStr : this._useBlankStr
        Tween.set(el, {
          color: this._defCol[i].getStyle(),
          backgroundColor: '',
          lineHeight: Util.map(Math.cos(rad * 2), 0.25, 0.75, -1, 1),
        })
      }



    })
  }
}







