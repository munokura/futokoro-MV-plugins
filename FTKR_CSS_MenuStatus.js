//=============================================================================
// メニュー画面のステータス表示を変更するプラグイン
// FTKR_CSS_MenuStatus.js
// プラグインNo : 47
// 作成者     : フトコロ
// 作成日     : 2017/06/18
// 最終更新日 : 2018/12/13
// バージョン : v2.1.3
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_MS = true;

var FTKR = FTKR || {};
FTKR.CSS = FTKR.CSS || {};
FTKR.CSS.MS = FTKR.CSS.MS || {};

//=============================================================================
/*:
@plugindesc v2.1.3 Plugin that changes the status display on the menu screen
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/futokoro-MV-plugins ).
Original plugin by Futokoro.
Please check the URL below for the latest version of the plugin.
URL https://github.com/futokoro/RPGMaker
-----
-----------------------------------------------------------------------------
Overview
-----------------------------------------------------------------------------
By implementing this plugin, you can change the layout of actor status displays on the menu screen.

This plugin requires FTKR_CustomSimpleActorStatus.js (v3.0.0 or later).

For instructions on how to use the plugin, see the online manual page below.
https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_MenuStatus.ja.md

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. When combining with the following plugins, be sure to pay attention to the order of plugin management.

FTKR_CustomSimpleActorStatus.js (Changes the status display)
↑Register above this plugin↑
FTKR_CSS_MenuStatus.js

-----------------------------------------------------------------------------
Setting the Simple Actor Status Display
-----------------------------------------------------------------------------
You can change the status display layout displayed on the menu screen by setting the plugin parameters.

For the meaning of each parameter and how to set it, refer to the FTKR_CustomSimpleActorStatus.js help.

Note that the settings for walking characters, SV Battle characters, custom parameters, and custom gauges follow the settings in FTKR_CustomSimpleActorStatus.js.

-----------------------------------------------------------------------------
Setting the Menu Screen Status Window
-----------------------------------------------------------------------------
This can be set using the following plugin parameters.

<Enabled Custom Window>
: Specifies whether to use the menu screen window change function.
: 0 - Disabled, 1 - Enabled

<Number Max Cols>
: Changes the number of actors arranged horizontally within the window.
: Default is 1.

<Cursor Line Number>
: Sets the number of lines the cursor (per actor) should be tall.
: Default is 4.

<Cursor Height Space>
: Sets the vertical cursor spacing.
: Default is 0 (pixels).

<Font Size>
: Changes the font size within the window.
: Default is 28 (pixels).

<Window Padding>
: Changes the margins around the window.
: Default is 18 (pixels).

<Window Line Height>
: Changes the height of one line within the window.
: Default is 36 (pixels).

<Window Opacity>
: Changes the background transparency within the window.
: Default is 192.
: 0 - Transparent, 255 - Opaque

<Hide Window Frame>
: Specifies whether to hide the window frame.
: 1 - Hide, 0 - Show
: Default is show.

<Window Height>
Window height is calculated using the following formula:
[Window Height] = [Number of Vertical Lines] x [Line Height] + [Margin Size] x 2

<Font Size and Line Height>
Basically, set the font size so that it is proportional to the size of the bottom.
Font Size < Line Height

<How to Hide the Window>
The following settings will hide the window frame and background,
displaying only the actor status.

<Window Opacity>: 0
<Hide Window Frame>: 1

-----------------------------------------------------------------------------
License for this Plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin Publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v2.1.3 - 2018/12/13: Changed the default value of the plugin parameter statusList.

v2.1.2 - 2018/09/29: Added Traits
1. Added selectable items to the plugin parameter list.

v2.1.1 - 2018/09/12: Removed unnecessary plugin parameters.

v2.1.0 - 2018/08/30: Added Traits
1. Added the ability to select the status to display in the plugin parameters from a list.

v2.0.0 - August 19, 2018: Updated to support FTKR_CustomSimpleActorStatus v3.0.0.

v1.1.0 - November 18, 2017: Specification changes
1. Compatible with FTKR_CustomSimpleActorStatus.js v2.6.0.

v1.0.0 - June 18, 2017: First version created.
Split from FTKR_CustomSimpleActorStatus.js v1.8.0.

-----------------------------------------------------------------------------

@param --簡易ステータス表示--
@text --Simple status display--

@param statusList
@desc Set the status to display and its position.
@default ["{\"text\":\"face\",\"x\":\"0\",\"y\":\"0\",\"width\":\"144\"}","{\"text\":\"name\",\"x\":\"162\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"level\",\"x\":\"162\",\"y\":\"36\",\"width\":\"150\"}","{\"text\":\"state\",\"x\":\"162\",\"y\":\"72\",\"width\":\"150\"}","{\"text\":\"class\",\"value\":\"\",\"x\":\"342\",\"y\":\"0\",\"width\":\"198\"}","{\"text\":\"hp\",\"value\":\"\",\"x\":\"342\",\"y\":\"36\",\"width\":\"198\"}","{\"text\":\"mp\",\"value\":\"\",\"x\":\"342\",\"y\":\"72\",\"width\":\"198\"}"]
@type struct<status>[]

@param Actor Status Space In Text
@desc Specifies the spacing when displaying multiple items within a text.
@default 5

@param --ステータスウィンドウ設定--
@text --Status window settings--

@param Enabled Custom Window
@desc Use window layout change Traits: 1 - enable, 0 - disable
@default 0

@param Number Max Cols
@desc Number of actors to arrange horizontally: Default 1
@default 1

@param Cursor Line Number
@desc Cursor height in lines: default 4
@default 4

@param Cursor Height Space
@desc Vertical cursor spacing: Default 0
@default 0

@param Font Size
@desc Font size: Default 28
@default 28

@param Window Padding
@desc Margins around the window: default 18
@default 18

@param Window Line Height
@desc Height of one line in the window: default 36
@default 36

@param Window Opacity
@desc Window background transparency: default 192
@default 192

@param Hide Window Frame
@desc Whether to hide the window frame: 1 - hide, 0 - show
@default 0
*/


/*~struct~status:
@param text
@desc Select the status to display. If it is not in the list, enter it directly in text.
@type select
@option name
@value name
@option Nickname
@value nickname
@option Occupation
@value class
@option level
@value level
@option HP
@value hp
@option MP
@value mp
@option TP
@value tp
@option Facial image
@value face
@option Face image (size specified)
@value face(%1)
@option Walking character image
@value chara
@option SV battle character image
@value sv
@option State (horizontal)
@value state
@option State (Vertical)
@value state2(%1)
@option profile
@value profile
@option Normal ability scores
@value param(%1)
@option Normal ability score (base)
@value pbase(%1)
@option Normal ability score (increase)
@value pdiff(%1)
@option Equipment
@value equip(%1)
@option Equipment parameters
@value eparam(%1)
@option Custom Parameters
@value custom(%1)
@option Custom Gauge
@value gauge(%1)
@option Actor-specific custom gauge
@value agauge(%1)
@option Class-specific custom gauge
@value cgauge(%1)
@option Custom Images
@value image
@option Custom Image (Registration ID)
@value image(%1)
@option message
@value message
@option text
@value text(%1)
@option JS formula (numerical display)
@value eval(%1)
@option JS calculation formula (character string display)
@value streval(%1)
@option horizontal line
@value line
@option AOP Stats
@value aop(%1)
@option AOP ability score (base)
@value aopbase(%1)
@option AOP ability value (increase)
@value aopdiff(%1)
@option AOP equipment parameters
@value eaop(%1)
@option Item Name
@value iname
@option Item Icon
@value iicon
@option Item Description
@value idesc
@option Item Type
@value itype
@option Item equipment type
@value ietype
@option Item Range
@value iscope
@option Item Elements
@value ielement
@option Item setting details
@value iparam(%1)
@option Item custom image
@value iimage(%1)
@option Map Name
@value mapname

@param value
@desc Enter the content of the status %1 to be set in the format code(%1)

@param x
@desc X coordinate to display
@default 0

@param y
@desc Y coordinate to display
@default 0

@param width
@desc Display width
@default 0
*/


/*:ja
@plugindesc v2.1.3 メニュー画面のステータス表示を変更するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、メニュー画面で表示するアクターの
ステータス表示のレイアウトを変更できます。

このプラグインには、FTKR_CustomSimpleActorStatus.js (v3.0.0以降)が必要です。

プラグインの使い方は、下のオンラインマニュアルページを見てください。
https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_MenuStatus.ja.md


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。

   FTKR_CustomSimpleActorStatus.js (ステータス表示を変更)
   ↑このプラグインよりも上に登録↑
   FTKR_CSS_MenuStatus.js


-----------------------------------------------------------------------------
アクターの簡易ステータス表示の設定
-----------------------------------------------------------------------------
プラグインパラメータの設定により、メニュー画面で表示する
ステータスの表示レイアウトを変更することができます。

各パラメータの意味と、設定方法は、
FTKR_CustomSimpleActorStatus.jsのヘルプを参照してください。

なお、歩行キャラ、SV戦闘キャラ、カスタムパラメータ、カスタムゲージの
設定は、FTKR_CustomSimpleActorStatus.jsの設定に従います。


-----------------------------------------------------------------------------
メニュー画面のステータスウィンドウの設定
-----------------------------------------------------------------------------
以下のプラグインパラメータで設定できます。

<Enabled Custom Window>
   :メニュー画面のウィンドウ変更機能を使うか指定します。
   :0 - 無効, 1 - 有効

<Number Max Cols>
   :ウィンドウ内でアクターを横に並べる数を変更します。
   :デフォルトは 1 です。

<Cursor Line Number>
   :カーソル(アクター１人分)の高さを何行分にするか設定します。
   :デフォルトは 4 です。

<Cursor Height Space>
   :縦のカーソル間隔を設定します。
   :デフォルトは 0 です。(単位はpixel)

<Font Size>
   :ウィンドウ内のフォントサイズを変更します。
   :デフォルトは 28 です。(単位はpixel)

<Window Padding>
   :ウィンドウの周囲の余白を変更します。
   :デフォルトは 18 です。(単位はpixel)

<Window Line Height>
   :ウィンドウ内の1行の高さを変更します。
   :デフォルトは 36 です。(単位はpixel)

<Window Opacity>
   :ウィンドウ内の背景の透明度を変更します。
   :デフォルトは 192 です。
   :0 - 透明、255 - 不透明

<Hide Window Frame>
   :ウィンドウ枠を非表示にするか指定します。
   :1 - 非表示にする、0 - 表示する
   :デフォルトは表示します。


＜ウィンドウの高さ＞
ウィンドウの高さは、以下の計算式で算出します。
   [ウィンドウ高さ] ＝ [縦の行数] × [1行の高さ] + [余白のサイズ] × 2


＜フォントサイズと行の高さ＞
基本的に、下の大小関係になるように設定しましょう。
   フォントサイズ ＜ 1行の高さ


＜ウィンドウを消す方法＞
以下の設定にすると、ウィンドウ枠とウィンドウの背景が消えて
アクターのステータスだけを表示します。

<Window Opacity>     : 0
<Hide Window Frame>  : 1


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php


プラグイン公開元
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v2.1.3 - 2018/12/13 : プラグインパラメータstatusListの初期値変更

v2.1.2 - 2018/09/29 : 機能追加
   1. プラグインパラメータのリストで選択できる項目を追加。

v2.1.1 - 2018/09/12 : 不要なプラグインパラメータを削除

v2.1.0 - 2018/08/30 : 機能追加
   1. プラグインパラメータで表示するステータスをリストで選択できる機能を追加。

v2.0.0 - 2018/08/19 : FTKR_CustomSimpleActorStatus v3.0.0 対応版に変更

v1.1.0 - 2017/11/18 : 仕様変更
   1. FTKR_CustomSimpleActorStatus.js の v2.6.0に対応。

v1.0.0 - 2017/06/18 : 初版作成
   FTKR_CustomSimpleActorStatus.js v1.8.0 から分離

-----------------------------------------------------------------------------

@param --簡易ステータス表示--
@text --簡易ステータス表示--

@param statusList
@desc 表示するステータスとその位置を設定します。
@default ["{\"text\":\"face\",\"x\":\"0\",\"y\":\"0\",\"width\":\"144\"}","{\"text\":\"name\",\"x\":\"162\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"level\",\"x\":\"162\",\"y\":\"36\",\"width\":\"150\"}","{\"text\":\"state\",\"x\":\"162\",\"y\":\"72\",\"width\":\"150\"}","{\"text\":\"class\",\"value\":\"\",\"x\":\"342\",\"y\":\"0\",\"width\":\"198\"}","{\"text\":\"hp\",\"value\":\"\",\"x\":\"342\",\"y\":\"36\",\"width\":\"198\"}","{\"text\":\"mp\",\"value\":\"\",\"x\":\"342\",\"y\":\"72\",\"width\":\"198\"}"]
@type struct<status>[]

@param Actor Status Space In Text
@desc Text内で複数表示する場合の間隔を指定します。
@default 5

@param --ステータスウィンドウ設定--
@text --ステータスウィンドウ設定--

@param Enabled Custom Window
@desc ウィンドウのレイアウト変更機能を使うか。 1 - 有効にする, 0 - 無効にする
@default 0

@param Number Max Cols
@desc アクターを横に並べる数：デフォルト 1
@default 1

@param Cursor Line Number
@desc カーソル高さの行数：デフォルト 4
@default 4

@param Cursor Height Space
@desc 縦のカーソル間隔：デフォルト 0
@default 0

@param Font Size
@desc フォントサイズ：デフォルト 28
@default 28

@param Window Padding
@desc ウィンドウの周囲の余白：デフォルト 18
@default 18

@param Window Line Height
@desc ウィンドウ内の1行の高さ：デフォルト 36
@default 36

@param Window Opacity
@desc ウィンドウ内の背景の透明度：デフォルト 192
@default 192

@param Hide Window Frame
@desc ウィンドウ枠を非表示にするか 1 - 非表示にする、0 - 表示する
@default 0
*/


/*~struct~status:ja
@param text
@desc 表示するステータスを選択 リストにない場合は、直接テキストで記述
@type select
@option 名前
@value name
@option 二つ名
@value nickname
@option 職業
@value class
@option レベル
@value level
@option HP
@value hp
@option MP
@value mp
@option TP
@value tp
@option 顔画像
@value face
@option 顔画像(サイズ指定)
@value face(%1)
@option 歩行キャラ画像
@value chara
@option SV戦闘キャラ画像
@value sv
@option ステート(横)
@value state
@option ステート(縦)
@value state2(%1)
@option プロフィール
@value profile
@option 通常能力値
@value param(%1)
@option 通常能力値(素)
@value pbase(%1)
@option 通常能力値(増加分)
@value pdiff(%1)
@option 装備
@value equip(%1)
@option 装備パラメータ
@value eparam(%1)
@option カスタムパラメータ
@value custom(%1)
@option カスタムゲージ
@value gauge(%1)
@option アクター別カスタムゲージ
@value agauge(%1)
@option クラス別カスタムゲージ
@value cgauge(%1)
@option カスタム画像
@value image
@option カスタム画像(登録ID)
@value image(%1)
@option メッセージ
@value message
@option テキスト
@value text(%1)
@option JS計算式(数値表示)
@value eval(%1)
@option JS計算式(文字列表示)
@value streval(%1)
@option 横線
@value line
@option AOP能力値
@value aop(%1)
@option AOP能力値(素)
@value aopbase(%1)
@option AOP能力値(増加分)
@value aopdiff(%1)
@option AOP装備パラメータ
@value eaop(%1)
@option アイテム名
@value iname
@option アイテムアイコン
@value iicon
@option アイテム説明
@value idesc
@option アイテムタイプ
@value itype
@option アイテム装備タイプ
@value ietype
@option アイテム範囲
@value iscope
@option アイテム属性
@value ielement
@option アイテム設定詳細
@value iparam(%1)
@option アイテムカスタム画像
@value iimage(%1)
@option マップ名
@value mapname

@param value
@desc code(%1)の形式で設定するステータスの%1の内容を入力

@param x
@desc 表示するX座標
@default 0

@param y
@desc 表示するY座標
@default 0

@param width
@desc 表示する幅
@default 0
*/

if (Imported.FTKR_CSS) (function () {

   var paramParse = function (obj) {
      return JSON.parse(JSON.stringify(obj, paramReplace));
   };

   var paramReplace = function (key, value) {
      try {
         return JSON.parse(value || null);
      } catch (e) {
         return value;
      }
   };

   //=============================================================================
   // プラグイン パラメータ
   //=============================================================================
   var parameters = PluginManager.parameters('FTKR_CSS_MenuStatus');

   //簡易ステータスオブジェクト
   FTKR.CSS.MS.simpleStatus = {
      statusList: paramParse(parameters['statusList']),
      spaceIn: Number(parameters['Actor Status Space In Text'] || 0),
   };

   //ウィンドウ設定オブジェクト
   FTKR.CSS.MS.window = {
      enabled: Number(parameters['Enabled Custom Window'] || 0),
      maxCols: Number(parameters['Number Max Cols'] || 0),
      fontSize: Number(parameters['Font Size'] || 0),
      padding: Number(parameters['Window Padding'] || 0),
      lineHeight: Number(parameters['Window Line Height'] || 0),
      opacity: Number(parameters['Window Opacity'] || 0),
      hideFrame: Number(parameters['Hide Window Frame'] || 0),
      cursorHeight: Number(parameters['Cursor Line Number'] || 0),
      hspace: Number(parameters['Cursor Height Space'] || 0),
   };

   //=============================================================================
   // Window_MenuStatus
   // メニュー画面のステータスウィンドウの表示クラス
   //=============================================================================
   Window_MenuStatus.prototype.standardCssLayout = function () {
      return FTKR.CSS.MS.window;
   };

   Window_MenuStatus.prototype.standardCssStatus = function () {
      return FTKR.CSS.MS.simpleStatus;
   };

   var _Window_MenuStatus_itemHeight = Window_MenuStatus.prototype.itemHeight;
   Window_MenuStatus.prototype.itemHeight = function () {
      return FTKR.CSS.MS.window.enabled ?
         this.lineHeight() * this.cursorHeight() :
         _Window_MenuStatus_itemHeight.call(this);
   };

   //書き換え
   Window_MenuStatus.prototype.drawItemImage = function (index) {
   };

   //書き換え
   Window_MenuStatus.prototype.drawItemStatus = function (index) {
      var lss = this._lssStatus;
      var actor = $gameParty.members()[index];
      var rect = this.itemRect(index);
      this.drawCssActorStatus(index, actor, rect.x, rect.y, rect.width, rect.height, lss);
   };

   //書き換え
   Window_MenuStatus.prototype.drawAllItems = function () {
      var topIndex = this.topIndex();
      for (var i = 0; i < this.maxPageItems(); i++) {
         var index = topIndex + i;
         if (index < this.maxItems()) {
            this.drawItem(index);
         } else {
            this.clearCssSprite(index % this.maxPageItems());
         }
      }
   };

}());//EOF