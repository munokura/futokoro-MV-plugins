//=============================================================================
// 詳細ステータス画面の表示内容を変更するプラグイン
// FTKR_CSS_DetailedStatus.js
// プラグインNo : 27
// 作成者     : フトコロ
// 作成日     : 2017/04/21
// 最終更新日 : 2018/12/13
// バージョン : v2.1.4
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_CSS_DS = true;

var FTKR = FTKR || {};
FTKR.CSS.DS = FTKR.CSS.DS || {};

//=============================================================================
/*:
@plugindesc v2.1.4 Plugin that changes the display content of the detailed status screen
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
By implementing this plugin, you can change the layout of the detailed status screen.

This plugin requires FTKR_CustomSimpleActorStatus.js (v3.0.0 or later).

For instructions on how to use the plugin, see the online manual page below.
https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_DetailedStatus.ja.md

-----------------------------------------------------------------------------
Setup Instructions
---------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. When combining with the following plugins, be sure to pay attention to the order of plugin management.

FTKR_CustomSimpleActorStatus.js (Changes the status display)
↑Register above this plugin↑
FTKR_CSS_DetailedStatus.js

----------------------------------------------------------------------------
Actor Detailed Status Display Settings
-----------------------------------------------------------------------------
You can change the display layout of the status screen by setting the plugin parameters.

For the meaning of each parameter and how to set it, refer to the FTKR_CustomSimpleActorStatus.js help.

Note that the settings for walking characters, SV Battle characters, custom parameters, and custom gauges follow the settings in FTKR_CustomSimpleActorStatus.js.

-----------------------------------------------------------------------------
Status Window Settings
-----------------------------------------------------------------------------
You can set this using the following plugin parameters.

<Enabled Custom Window>
: Specifies whether to use the skill screen window change function.
: 0 - Disabled, 1 - Enabled

<Font Size>
: Changes the font size within the window.
: Default is 28. (Unit: pixels)

<Window Padding>
: Changes the margins around the window.
: Default: 18. (Unit: pixels)

<Window Line Height>
: Changes the height of one line in the window.
: Default: 36. (Unit: pixels)

<Window Opacity>
: Changes the background transparency of the window.
: Default: 192.
: 0 - Transparent, 255 - Opaque

<Hide Window Frame>
: Specifies whether to hide the window frame.
: 1 - Hidden, 0 - Visible
: Default: Visible.


<Window Height>
The window height is calculated using the following formula:
[Window Height] = [Number of Vertical Lines] × [Line Height] + [Margin Size] × 2


<Font Size and Line Height>
Basically, set the font size and line height so that the size relationship is the same as below.
Font size < Line height


<How to hide the window>
The following settings will hide the window frame and background,
displaying only the actor's status.


<Window Opacity>: 0
<Hide Window Frame>: 1

-----------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin Publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v2.1.4 - 2018/12/13: Changed the default value of the plugin parameter statusList.

v2.1.3 - 2018/10/20: Conflict Avoidance.
1. Supports dsWeaponMastery plugin proficiency display.

v2.1.2 - 2018/09/29: Added Traits.
1. Added selectable items to the plugin parameter list.

v2.1.1 - September 12, 2018: Removed unnecessary plugin parameters.

v2.1.0 - August 30, 2018: Added Traits.
1. Added the ability to automatically refresh the window display.
2. Added the ability to select the status to display in the plugin parameters from a list.

v2.0.0 - August 19, 2018: Updated to support FTKR_CustomSimpleActorStatus v3.0.0.

v1.1.0 - November 18, 2017: Specification changes.
1. Compatible with FTKR_CustomSimpleActorStatus.js v2.6.0.

v1.0.2 - May 13, 2017: Bug fixes.
1. Fixed an issue where window settings were not functioning properly.

v1.0.1 - May 8, 2017: Added Traits and removed unnecessary parameters.
1. Added the ability to change window settings.

v1.0.0 - April 21, 2017: First version created.

-----------------------------------------------------------------------------

@param --詳細ステータスの表示設定--
@text --Detailed status display settings--

@param statusList
@desc Set the status to display and its position.
@default ["{\"text\":\"name\",\"value\":\"\",\"x\":\"6\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"class\",\"value\":\"\",\"x\":\"192\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"nickname\",\"x\":\"432\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"line\",\"value\":\"\",\"x\":\"0\",\"y\":\"36\",\"width\":\"780\"}","{\"text\":\"face\",\"x\":\"12\",\"y\":\"72\",\"width\":\"144\"}","{\"text\":\"name\",\"x\":\"204\",\"y\":\"72\",\"width\":\"150\"}","{\"text\":\"state\",\"x\":\"204\",\"y\":\"108\",\"width\":\"150\"}","{\"text\":\"hp\",\"x\":\"204\",\"y\":\"144\",\"width\":\"150\"}","{\"text\":\"mp\",\"x\":\"204\",\"y\":\"180\",\"width\":\"150\"}","{\"text\":\"custom(%1)\",\"value\":\"0\",\"x\":\"456\",\"y\":\"72\",\"width\":\"270\"}","{\"text\":\"custom(%1)\",\"value\":\"1\",\"x\":\"456\",\"y\":\"108\",\"width\":\"270\"}","{\"text\":\"custom(%1)\",\"value\":\"2\",\"x\":\"456\",\"y\":\"144\",\"width\":\"270\"}","{\"text\":\"custom(%1)\",\"value\":\"3\",\"x\":\"456\",\"y\":\"180\",\"width\":\"270\"}","{\"text\":\"line\",\"value\":\"\",\"x\":\"0\",\"y\":\"216\",\"width\":\"780\"}","{\"text\":\"param(%1)\",\"value\":\"2\",\"x\":\"48\",\"y\":\"252\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"0\",\"x\":\"432\",\"y\":\"252\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"3\",\"x\":\"48\",\"y\":\"288\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"1\",\"x\":\"432\",\"y\":\"288\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"4\",\"x\":\"48\",\"y\":\"324\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"2\",\"x\":\"432\",\"y\":\"324\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"5\",\"x\":\"48\",\"y\":\"360\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"3\",\"x\":\"432\",\"y\":\"360\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"6\",\"x\":\"48\",\"y\":\"396\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"5\",\"x\":\"432\",\"y\":\"396\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"7\",\"x\":\"48\",\"y\":\"432\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"4\",\"x\":\"432\",\"y\":\"432\",\"width\":\"312\"}","{\"text\":\"line\",\"value\":\"\",\"x\":\"0\",\"y\":\"468\",\"width\":\"780\"}","{\"text\":\"profile\",\"value\":\"\",\"x\":\"0\",\"y\":\"504\",\"width\":\"780\"}"]
@type struct<status>[]

@param DS Space In Text
@desc Specifies the spacing when displaying multiple items within a text.
@default 5

@param --ウィンドウ設定--
@text --Window Settings--

@param Enabled Custom Window
@desc Use window layout change Traits: 0 - Disable, 1 - Enable
@default 0
@type select
@option Disable
@value 0
@option Enable
@value 1

@param Font Size
@desc Font size
@default 28

@param Window Padding
@desc Margins around the window
@default 18

@param Window Line Height
@desc The height of one line in the window
@default 36

@param Window Opacity
@desc Background transparency in windows
@default 192

@param Hide Window Frame
@desc Whether to hide the window frame: 1 - hide, 0 - show
@default 0
@type select
@option Show
@value 0
@option Hide
@value 1

@param Auto Refresh Window
@desc Settings for automatic update of display contents This setting is effective even if layout change is disabled.
@default {"enabled":"false","count":"60"}
@type struct<update>
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

/*~struct~update:
@param enabled
@desc Whether to automatically refresh the window display
@default false
@type boolean
@on Automatic update ON
@off Automatic update OFF

@param count
@desc Set the display update interval.
@default 60
@type number
*/


/*:ja
@plugindesc v2.1.4 詳細ステータス画面の表示内容を変更するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、詳細ステータス画面のレイアウトを変更できます。

このプラグインには、FTKR_CustomSimpleActorStatus.js (v3.0.0以降)が必要です。

プラグインの使い方は、下のオンラインマニュアルページを見てください。
https://github.com/futokoro/RPGMaker/blob/master/FTKR_CSS_DetailedStatus.ja.md


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. 以下のプラグインと組み合わせる場合は、プラグイン管理の順番に注意してください。

   FTKR_CustomSimpleActorStatus.js (ステータス表示を変更)
   ↑このプラグインよりも上に登録↑
   FTKR_CSS_DetailedStatus.js


-----------------------------------------------------------------------------
アクターの詳細ステータス表示の設定
-----------------------------------------------------------------------------
プラグインパラメータの設定により、ステータス画面で表示する表示レイアウトを
変更することができます。

各パラメータの意味と、設定方法は、
FTKR_CustomSimpleActorStatus.jsのヘルプを参照してください。

なお、歩行キャラ、SV戦闘キャラ、カスタムパラメータ、カスタムゲージの
設定は、FTKR_CustomSimpleActorStatus.jsの設定に従います。


-----------------------------------------------------------------------------
ステータスウィンドウの設定
-----------------------------------------------------------------------------
以下のプラグインパラメータで設定できます。

<Enabled Custom Window>
   :スキル画面のウィンドウ変更機能を使うか指定します。
   :0 - 無効, 1 - 有効

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

v2.1.4 - 2018/12/13 : プラグインパラメータstatusListの初期値変更

v2.1.3 - 2018/10/20 : 競合回避
   1. dsWeaponMasteryプラグインの熟練度表示に対応

v2.1.2 - 2018/09/29 : 機能追加
   1. プラグインパラメータのリストで選択できる項目を追加。

v2.1.1 - 2018/09/12 : 不要なプラグインパラメータを削除

v2.1.0 - 2018/08/30 : 機能追加
   1. ウィンドウの表示内容を自動更新する機能を追加。
   2. プラグインパラメータで表示するステータスをリストで選択できる機能を追加。

v2.0.0 - 2018/08/19 : FTKR_CustomSimpleActorStatus v3.0.0 対応版に変更

v1.1.0 - 2017/11/18 : 仕様変更
   1. FTKR_CustomSimpleActorStatus.js の v2.6.0に対応。

v1.0.2 - 2017/05/13 : 不具合修正
   1. ウィンドウ設定が正常に機能していない不具合を修正。

v1.0.1 - 2017/05/08 : 機能追加、不要なパラメータを削除
   1. ウィンドウの設定変更機能を追加。

v1.0.0 - 2017/04/21 : 初版作成

-----------------------------------------------------------------------------

@param --詳細ステータスの表示設定--
@text --詳細ステータスの表示設定--

@param statusList
@desc 表示するステータスとその位置を設定します。
@default ["{\"text\":\"name\",\"value\":\"\",\"x\":\"6\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"class\",\"value\":\"\",\"x\":\"192\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"nickname\",\"x\":\"432\",\"y\":\"0\",\"width\":\"150\"}","{\"text\":\"line\",\"value\":\"\",\"x\":\"0\",\"y\":\"36\",\"width\":\"780\"}","{\"text\":\"face\",\"x\":\"12\",\"y\":\"72\",\"width\":\"144\"}","{\"text\":\"name\",\"x\":\"204\",\"y\":\"72\",\"width\":\"150\"}","{\"text\":\"state\",\"x\":\"204\",\"y\":\"108\",\"width\":\"150\"}","{\"text\":\"hp\",\"x\":\"204\",\"y\":\"144\",\"width\":\"150\"}","{\"text\":\"mp\",\"x\":\"204\",\"y\":\"180\",\"width\":\"150\"}","{\"text\":\"custom(%1)\",\"value\":\"0\",\"x\":\"456\",\"y\":\"72\",\"width\":\"270\"}","{\"text\":\"custom(%1)\",\"value\":\"1\",\"x\":\"456\",\"y\":\"108\",\"width\":\"270\"}","{\"text\":\"custom(%1)\",\"value\":\"2\",\"x\":\"456\",\"y\":\"144\",\"width\":\"270\"}","{\"text\":\"custom(%1)\",\"value\":\"3\",\"x\":\"456\",\"y\":\"180\",\"width\":\"270\"}","{\"text\":\"line\",\"value\":\"\",\"x\":\"0\",\"y\":\"216\",\"width\":\"780\"}","{\"text\":\"param(%1)\",\"value\":\"2\",\"x\":\"48\",\"y\":\"252\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"0\",\"x\":\"432\",\"y\":\"252\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"3\",\"x\":\"48\",\"y\":\"288\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"1\",\"x\":\"432\",\"y\":\"288\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"4\",\"x\":\"48\",\"y\":\"324\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"2\",\"x\":\"432\",\"y\":\"324\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"5\",\"x\":\"48\",\"y\":\"360\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"3\",\"x\":\"432\",\"y\":\"360\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"6\",\"x\":\"48\",\"y\":\"396\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"5\",\"x\":\"432\",\"y\":\"396\",\"width\":\"312\"}","{\"text\":\"param(%1)\",\"value\":\"7\",\"x\":\"48\",\"y\":\"432\",\"width\":\"160\"}","{\"text\":\"equip(%1)\",\"value\":\"4\",\"x\":\"432\",\"y\":\"432\",\"width\":\"312\"}","{\"text\":\"line\",\"value\":\"\",\"x\":\"0\",\"y\":\"468\",\"width\":\"780\"}","{\"text\":\"profile\",\"value\":\"\",\"x\":\"0\",\"y\":\"504\",\"width\":\"780\"}"]
@type struct<status>[]

@param DS Space In Text
@desc Text内で複数表示する場合の間隔を指定します。
@default 5

@param --ウィンドウ設定--
@text --ウィンドウ設定--

@param Enabled Custom Window
@desc ウィンドウのレイアウト変更機能を使うか。 0 - 無効, 1 - 有効
@default 0
@type select
@option 無効にする
@value 0
@option 有効にする
@value 1

@param Font Size
@desc フォントサイズ
@default 28

@param Window Padding
@desc ウィンドウの周囲の余白
@default 18

@param Window Line Height
@desc ウィンドウ内の1行の高さ
@default 36

@param Window Opacity
@desc ウィンドウ内の背景の透明度
@default 192

@param Hide Window Frame
@desc ウィンドウ枠を非表示にするか 1 - 非表示にする、0 - 表示する
@default 0
@type select
@option 表示する
@value 0
@option 非表示にする
@value 1

@param Auto Refresh Window
@desc 表示内容の自動更新に関する設定 この設定は、レイアウト変更が無効でも効果があります
@default {"enabled":"false","count":"60"}
@type struct<update>
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

/*~struct~update:ja
@param enabled
@desc ウィンドウの表示を自動更新するか
@default false
@type boolean
@on 自動更新ON
@off 自動更新OFF

@param count
@desc 表示更新間隔を設定します。
@default 60
@type number
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
   var parameters = PluginManager.parameters('FTKR_CSS_DetailedStatus');

   //詳細ステータスオブジェクト
   FTKR.CSS.DS.detailedStatus = {
      statusList: paramParse(parameters['statusList']),
      spaceIn: Number(parameters['DS Space In Text'] || 0),
   };

   FTKR.CSS.DS.window = {
      enabled: paramParse(parameters['Enabled Custom Window'] || 0),
      fontSize: Number(parameters['Font Size'] || 0),
      padding: Number(parameters['Window Padding'] || 0),
      lineHeight: Number(parameters['Window Line Height'] || 0),
      opacity: Number(parameters['Window Opacity'] || 0),
      hideFrame: paramParse(parameters['Hide Window Frame'] || 0),
      autoRefresh: paramParse(parameters['Auto Refresh Window']) || {},
   };

   //=============================================================================
   // Window_Base
   //=============================================================================

   //=============================================================================
   // Window_Status
   // ステータス画面のステータスウィンドウの表示クラス
   //=============================================================================

   //書き換え
   var _DS_Window_Status_refresh = Window_Status.prototype.refresh;
   Window_Status.prototype.refresh = function () {
      this.contents.clear();
      if (Imported.dsWeaponMastery && this._switchWM) {
         _DS_Window_Status_refresh.call(this);
      } else {
         if (this._actor) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            this.drawCssActorStatus(0, this._actor, 0, 0, w, h, FTKR.CSS.DS.detailedStatus);
         }
      }
   };

   Window_Status.prototype.standardCssLayout = function () {
      return FTKR.CSS.DS.window;
   };

   var _DS_Window_Status_update = Window_Status.prototype.update;
   Window_Status.prototype.update = function () {
      _DS_Window_Status_update.call(this);
      if (FTKR.CSS.DS.window.autoRefresh.enabled && !this._cssUpdateCount) {
         this.refresh();
         this._cssUpdateCount = FTKR.CSS.DS.window.autoRefresh.count;
      } else {
         this._cssUpdateCount--;
      }
   };

}());//TKR_CustomSimpleActorStatus.jsが必要