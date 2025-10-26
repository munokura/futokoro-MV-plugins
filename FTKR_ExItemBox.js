//=============================================================================
// アイテムボックスの仕様を変更するプラグイン
// FTKR_ExItemBox.js
// 作成者     : フトコロ
// 作成日     : 2017/06/04
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================
/*:
@plugindesc v1.0.0 Change the item box specifications
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
Implementing this plugin changes the specifications of your item box.

1. You can change the display layout within your item box.
2. You can change the item category (items, weapons, armor, valuables).
3. You can set the item box's inventory capacity.
4. If you exceed the maximum item stack size, you can stack items separately.
5. After selecting an item, a subcommand will appear, allowing you to discard the item.

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. When using the item box inventory capacity setting and stack change functions,
existing save data cannot be used.

-----------------------------------------------------------------------------
Changing the Display Layout
-----------------------------------------------------------------------------
You can change the display layout of your item box.
You can set this in the Plugin Parameters - Display Settings.
The following changes can be made:

1. Number of columns in the item box and spacing between columns
2. Icon display and icon size
3. Item name display and font size
4. Separator between item name and possession count
5. Display of possession count and number of digits displayed
6. Display height of item name and possession count per row

-----------------------------------------------------------------------------
Changing Item Categories
-----------------------------------------------------------------------------
Changes the display of item categories on the item screen and shop screen.
To use this function, enable the <Enable Category> plugin parameter.

1. Changing Item Category Display
You can change the display of item categories depending on the settings in the <Items Category> plugin parameter.

The input information is as follows:
item - Displays "Items"
weapon - Displays "Weapons"
armor - Displays "Armor"
keyItem - Displays "Key Item"
all - Displays the display name set in the plugin parameter <Category All Name>
Displays all items, weapons, armor, and Key Item in the item box
any character - Displays any character entered
Sets this string as a new category name (*1)

Multiple categories can be set using a comma (,).
Item categories will be displayed in the order entered.

(*1) Adding a Category
By entering the following tag in the Note field of an item, weapon, or armor,
you can set the added category to the item, weapon, or armor.

<EIB_CATEGORY: category_name>
<EIB_CATEGORY: category_name>

2. Eliminating Item Category Selection
Disabling the plugin parameter <Enable Category> eliminates the item category selection and allows you to directly select the item box.

The item category displayed in the item box will be
the category set first in the plugin parameter <Items Category>.

-----------------------------------------------------------------------------
Setting Item Box Capacity
-----------------------------------------------------------------------------
You can set the item box capacity.
To use this Traits, enable the plugin parameter <Enable Capacity>.

Setting the capacity will limit the number of items you can hold in that category to the number you set.
You will not be able to hold any more items than this number, and any items you acquire will be automatically discarded.

If you set the item capacity to 10, you will only be able to hold 10 different items.
In this case, it does not matter how many of each item you have.

There are three categories you can set: "Items," "Weapons," and "Armor."
"Key Item" are included in the category of items.

You can determine whether your item box has space using the following script:

$gameParty.isItemsCapacityOk() - Item capacity
$gameParty.isWeaponsCapacityOk() - Weapon capacity
$gameParty.isArmorsCapacityOk() - Armor capacity

Set capacity as follows:
1. Set the [Initial Value] in the plugin parameters.
<Item Capacity>
<Weapon Capacity>
<Armor Capacity>
: Setting this to 0 will set unlimited capacity.

2. Set the [Additional Capacity] in the plugin command.
This additional capacity is calculated separately from the plugin parameter value.

EIB_SetCapacity [Category] [Value] [Calculation Method]
EIB_SET_CAPACITY [category] [value] [calc_method]

The [Category] entry specifies which category's capacity to change.
Item or ITEM
Weapon or WEAPON
Armor or ARMOR

[Number] Input
\V[x] references the value of the in-game variable ID x.

[Calculation Method] specifies how [Number] is calculated.
If no calculation method is specified, substitution is applied.
ADD or +
SUBTRACT or -
MULTIPLY or *
DIVIDE or /
MOD or %
Substitution or SUBSTITUTE or =

Example)
EIB_SET_CAPACITY ITEM 10 ADD
EIB_SET_CAPACITY ARMOR \V[1] SUBSTITUTE
EIB_SET_CAPACITY WEAPON 5 SUBTRACT

The above settings result in the following inventory capacity.

Inventory Capacity = Initial Value + Additional Item

-----------------------------------------------------------------------------
Item Stacking Settings
-----------------------------------------------------------------------------
In the item box, each item is displayed on a separate line.
The inventory count shows how many of that item you have.
This is the item stack.

This plugin allows you to change this stacking function.
To use this Traits, enable the plugin parameter <Enable Capacity>.

You can set the number of items that can be stacked in the following ways:
1. Set with the plugin parameter
<Max Stack Number>

2. Enter the following tag in the item's Note field:
<EIB_STACK: x>
: x - Max Stack Number

If settings overlap, the Note field setting takes priority.
You cannot possess more items than this setting, and any items you acquire will be automatically discarded.

If the plugin parameter <Enable Duplicate Stack> is enabled,
you can possess more items than the stack limit.
Any items exceeding the stack limit will be displayed on a separate line.
Note that items displayed on this separate line are counted as separate items in your inventory.

For example, if you have 20 "Potions" and the maximum stack limit is 10,
there will be two "Potion" lines.
In this case, you will be counted as having two types of item.

-----------------------------------------------------------------------------
About Subcommands
-----------------------------------------------------------------------------
This plugin adds subcommands after selecting an item on the Item screen in the menu.
To use this Traits, enable the plugin parameter <Enable Subcommand>.

Subcommands include the following:
1. Use - Uses an item. Grayed out if unavailable.
2. Discard - Discards an item. "Key Item" cannot be discarded.
3. Cancel - Closes the subcommand.

When you select "Drop," you set the number of items to discard.
Once you select the number, a confirmation screen will appear. You can discard the items by selecting "Execute" on that screen.

The confirmation screen can be hidden using the plugin parameter <Enable Confirmation>.

-----------------------------------------------------------------------------
License for this plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php

----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.0.0 - June 4, 2017: First version created

-----------------------------------------------------------------------------

@param --機能の有効無効設定--
@text --Traits enable/disable settings--

@param Enable Category
@desc Enables the category setting Traits. 1 - Enable, 0 - Disable
@default 0

@param Enable Capacity
@desc Enables the capacity and stack configuration Traits. 1 - Enable, 0 - Disable
@default 0

@param Enable SubCommand
@desc Enables the subcommand Traits. 1 - Enable, 0 - Disable
@default 0

@param --表示設定--
@text --Display settings--

@param Number of Columns
@desc Number of items to arrange horizontally
@default 2

@param Horizontal Space
@desc Display interval when items are arranged horizontally
@default 48

@param Window Line Height
@desc The height of one line in the window
@default 36

@param Display Item Icon
@desc Show item icons: 1 - Show, 0 - Don't show
@default 1

@param Icon Scale
@desc Set the icon display size (%). If you set it to 100% or more, the row height will also change.
@default 100

@param Display Item Name
@desc Show item names: 1 - Show, 0 - Don't show
@default 1

@param Font Size
@desc Set the font size. The line height will also change depending on the size.
@default 28

@param Display Separator
@desc Specify the delimiter between the item name and the number of items you own.
@default :

@param Display Item Number
@desc Display the number of items you own. 0 - Do not display, 1 - Display, 2 - Do not display when the number of items you own is 1.
@default 1

@param Display Number of Digit
@desc Set the number of digits to display for the number of items you own. If the number of digits you own exceeds the number of digits to display, it will be compressed horizontally.
@default 2

@param Display Text Position Y
@desc Set the display height of the item name and possession count. 0 - Top aligned, 1 - Centered, 2 - Bottom aligned
@default 1

@param --カテゴリー設定--
@text --Category Settings--

@param Items Category
@desc Categories to display in the item box. Separate them with a comma (,).
@default item, weapon, armor, keyItem

@param Category All Name
@desc Display name for category 'all'
@default All

@param --アイテムボックス容量設定--
@text --Item box capacity setting--

@param Item Capacity
@desc Item carrying capacity: 0 - unlimited, 1~ - specified number
@default 0

@param Weapon Capacity
@desc Weapon Capacity: 0 - Unlimited, 1~ - Specified number
@default 0

@param Armor Capacity
@desc Armor carrying capacity: 0 - unlimited, 1~ - specified number
@default 0

@param --スタック設定--
@text --Stack Settings--

@param Max Stack Number
@desc Maximum stack count
@default 99

@param Enable Duplicate Stack
@desc Can duplicate items be stacked? 1 - Allowed, 0 - Not allowed
@default 0

@param --購入設定--
@text --Purchase Settings--

@param Max Buy Number
@desc Maximum number of items that can be purchased at one time
@default 99

@param --サブコマンド--
@text --Subcommand--

@param Command Use Format
@desc Set the command name to use for the execution command.
@default 使う

@param Command Discard Format
@desc Set the command name for the execution command "Discard".
@default Discard

@param Command Cancel Format
@desc Set the command name for the execution command "Stop".
@default Cancel

@param --確認画面--
@text --Confirmation screen--

@param Enable Confirmation
@desc Whether to display a confirmation screen when discarding an item. 1 - Display, 0 - Do not display
@default 1

@param Conf Title Format
@desc Set the confirmation content when discarding items. %1 - Item name, %2 - Number to discard
@default Discard [%2] [%1]?

@param Confirmation Ok Format
@desc Set the command name for the confirmation command "Execute".
@default Ok

@param Confirmation Cancel Format
@desc Set the command name for the confirmation command "Do not execute."
@default Cancel
*/

/*:ja
@plugindesc v1.0.0 アイテムボックスの仕様を変更する
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、アイテムボックスの仕様を変更します。

１．アイテムボックス内の表示レイアウトを変更できます。
２．アイテムカテゴリー(アイテム、武器、防具、大事なもの)を変更できます。
３．アイテムボックスに所持容量を設定できます。
４．アイテムの最大スタック数を超えた場合、別にスタックすることができます。
５．アイテム選択後にサブコマンドを表示して、アイテムを捨てることができます。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。

2. アイテムボックスの所持容量の設定とスタックの変更機能を使う場合は、
   既存のセーブデータは使用できません。


-----------------------------------------------------------------------------
表示レイアウトの変更
-----------------------------------------------------------------------------
アイテムボックスの表示レイアウトを変更できます。
プラグインパラメータ--表示設定--で設定できます。
変更できる内容は以下の通りです。

1. アイテムボックスの表示列数と列同士の間隔
2. アイコンの表示有無とアイコンサイズ
3. アイテム名の表示有無とフォントサイズ
4. アイテム名と所持数の区切り記号
5. 所持数の表示有無と表示桁数
6. 行に対するアイテム名と所持数の表示高さ


-----------------------------------------------------------------------------
アイテムカテゴリーの変更
-----------------------------------------------------------------------------
アイテム画面や、ショップ画面のアイテムカテゴリーの表示を変更します。
この機能を使うためには、プラグインパラメータ<Enable Category>を
有効にしてください。

1. アイテムカテゴリーの表示を変える
プラグインパラメータ<Items Category>に設定した内容によって
アイテムカテゴリーの表示を変えることができます。

入力内容は以下。
  item      - 「アイテム」を表示
  weapon    - 「武器」を表示
  armor     - 「防具」を表示
  keyItem   - 「大事なもの」を表示
  all       - プラグインパラメータ<Category All Name>で設定した表示名を表示
              アイテムボックスにはアイテム・武器・防具・大事なものをすべて表示
  任意の文字 - 入力した任意の文字を表示
              この文字列を新たなカテゴリー名(*1)として設定します

カンマ(,)を使って複数設定できます。
入力した順番にアイテムカテゴリーを表示します。

(*1)カテゴリーの追加
アイテムや武器・防具のメモ欄に以下のタグを記入することで
追加したカテゴリーをアイテム・武器・防具に設定することができます。

<EIB_カテゴリー: カテゴリー名>
<EIB_CATEGORY: category_name>


2．アイテムカテゴリーの選択を無くす
プラグインパラメータ<Enable Category>を無効にすると、アイテムカテゴリーの
選択をなくして、直接アイテムボックスを選択できます。

この時アイテムボックスに表示されるアイテムのカテゴリーは
プラグインパラメータ<Items Category>の１番目に設定したカテゴリーです。


-----------------------------------------------------------------------------
アイテムボックスの所持容量の設定
-----------------------------------------------------------------------------
アイテムボックスに所持容量を設定することができます。
この機能を使うためには、プラグインパラメータ<Enable Capacity>を
有効にしてください。

所持容量を設定すると、そのカテゴリーは設定した数の種類までしか所持することが
できなくなります。
この設定数以上のアイテムは所持することができず、入手しても自動的に破棄します。

アイテムの所持容量を 10 に設定した場合、アイテムは 10種類までしか
所持できません。
この時、各アイテムが何個持っているかは関係ありません。

設定できるカテゴリーは「アイテム」「武器」「防具」の３つです。
「大事なもの」は、アイテムに含まれます。


アイテムボックスに空きがあるかどうかは、以下のスクリプトで判定できます。

$gameParty.isItemsCapacityOk()   - アイテムの所持容量
$gameParty.isWeaponsCapacityOk() - 武器の所持容量
$gameParty.isArmorsCapacityOk()  - 防具の所持容量


所持容量の設定方法は以下の通りです。
1. プラグインパラメータで[初期値]を設定
   <Item Capacity>
   <Weapon Capacity>
   <Armor Capacity>
   : 0 を設定した場合は、容量が無制限になります。

2. プラグインコマンドで[追加分]を設定
   この追加分は、プラグインパラメータの値とは別に計算します。

   EIB_所持容量設定 [カテゴリー] [数値] [計算方法]
   EIB_SET_CAPACITY [category] [value] [calc_method]

   [カテゴリー]の入力内容で、どのカテゴリーの容量を変えるか指定します。
     アイテム or ITEM
     武器 or WEAPON
     防具 or ARMOR

   [数値]の入力内容
     \V[x] でゲーム内変数ID x の値を参照できます。

   [計算方法]の入力内容で、[数値]をどのように計算するか指定します。
   計算方法を指定しない場合は、代入を適用します。
     加算 or ADD or +
     減算 or SUBTRACT or -
     乗算 or MULTIPLY or *
     除算 or DIVIDE or /
     剰余 or MOD or %
     代入 or SUBSTITUTE or =

   例)
   EIB_所持容量設定 アイテム 10 加算
   EIB_所持容量設定 防具 \V[1] 代入
   EIB_SET_CAPACITY WEAPON 5 SUBTRACT


上記の設定によって所持容量は以下の結果になります。

 所持容量　＝　初期値　＋　追加分


-----------------------------------------------------------------------------
アイテムのスタックの設定
-----------------------------------------------------------------------------
アイテムボックスの中で、１つのアイテムは１行にまとめて表示します。
そして、所持数を表示することでそのアイテムを何個所持しているか分かります。
これがアイテムのスタックです。

当プラグインでは、このスタック機能を変更することができます。
この機能を使うためには、プラグインパラメータ<Enable Capacity>を
有効にしてください。


アイテムをスタックできる数は以下の方法で設定できます。
1. プラグインパラメータで設定
   <Max Stack Number>

2. アイテムのメモ欄に以下のタグを記入
   <EIB_スタック: x>
   <EIB_STACK: x>
       : x - 最大スタック数

設定が被った場合、メモ欄の設定を優先します。
この設定数以上のアイテムは所持することができず、入手しても自動的に破棄します。


プラグインパラメータ<Enable Duplicate Stack>を許可設定すると
スタック数以上にアイテムを所持することができます。
スタック数を超えた分は、別の行に表示します。
なお、この別の行に表示したアイテムは、所持容量上別のアイテムとして計算します。

例えば「ポーション」を20個所持していて、スタック数の最大が10の場合
「ポーション」の行が 2つできます。
この時、アイテムを２種類持っていると数えます。


-----------------------------------------------------------------------------
サブコマンドについて
-----------------------------------------------------------------------------
当プラグインによりメニューのアイテム画面で、アイテム選択後に
サブコマンドを追加します。
この機能を使うためには、プラグインパラメータ<Enable Subcommand>を
有効にしてください。


サブコマンドには以下のコマンドがあります。
1. 使う　 - アイテムを使用します。使用できない場合はグレー表示になります。
2. 捨てる - アイテムを捨てます。「大事なもの」は捨てることが出来ません。
3. やめる - サブコマンドを閉じます。


「捨てる」を実行すると、捨てるアイテムの数を設定します。
数を決めると確認画面を表示し、その画面で「実行する」を選択することで、
アイテムを捨てることができます。

確認画面は、プラグインパラメータ<Enable Confirmation>で非表示設定に
することができます。


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.0.0 - 2017/06/04 : 初版作成

-----------------------------------------------------------------------------

@param --機能の有効無効設定--
@text --機能の有効無効設定--

@param Enable Category
@desc カテゴリー設定機能を有効にするか 1 - 有効にする, 0 - 無効にする
@default 0

@param Enable Capacity
@desc 所持容量およびスタック設定機能を有効にするか 1 - 有効にする, 0 - 無効にする
@default 0

@param Enable SubCommand
@desc サブコマンド機能を有効にするか 1 - 有効にする, 0 - 無効にする
@default 0

@param --表示設定--
@text --表示設定--

@param Number of Columns
@desc アイテムを横に並べる数
@default 2

@param Horizontal Space
@desc アイテムを横に並べた時の表示間隔
@default 48

@param Window Line Height
@desc ウィンドウ内の1行の高さ
@default 36

@param Display Item Icon
@desc アイテムアイコンを表示するか 1 - 表示する, 0 - 表示しない
@default 1

@param Icon Scale
@desc アイコンの表示サイズ(%)を設定する 100%以上に設定すると行の高さも変わります
@default 100

@param Display Item Name
@desc アイテム名を表示するか 1 - 表示する, 0 - 表示しない
@default 1

@param Font Size
@desc フォントサイズを設定する サイズによって行の高さも変わります
@default 28

@param Display Separator
@desc アイテム名と所持数の区切り記号を指定する
@default :

@param Display Item Number
@desc アイテム所持数を表示するか 0 - 表示しない, 1 - 表示する, 2 - 所持数が1の時表示しない
@default 1

@param Display Number of Digit
@desc アイテム所持数の表示桁数を設定する 所持数が表示桁数を超えると横に圧縮して表示する
@default 2

@param Display Text Position Y
@desc アイテム名と所持数の表示高さを設定 0 - 上揃え, 1 - 中央, 2 - 下揃え
@default 1

@param --カテゴリー設定--
@text --カテゴリー設定--

@param Items Category
@desc アイテムボックスで表示するカテゴリー カンマ(,)で分けること
@default item, weapon, armor, keyItem

@param Category All Name
@desc カテゴリー'all'の表示名
@default すべて

@param --アイテムボックス容量設定--
@text --アイテムボックス容量設定--

@param Item Capacity
@desc アイテムの所持容量 0 - 無制限, 1~ - 指定した数
@default 0

@param Weapon Capacity
@desc 武器の所持容量 0 - 無制限, 1~ - 指定した数
@default 0

@param Armor Capacity
@desc 防具の所持容量 0 - 無制限, 1~ - 指定した数
@default 0

@param --スタック設定--
@text --スタック設定--

@param Max Stack Number
@desc スタック数の最大値
@default 99

@param Enable Duplicate Stack
@desc 同一アイテムを重複してスタックできるか 1 - 許可する, 0 - 許可しない
@default 0

@param --購入設定--
@text --購入設定--

@param Max Buy Number
@desc 一度に購入できる最大数
@default 99

@param --サブコマンド--
@text --サブコマンド--

@param Command Use Format
@desc 実行コマンドの「使う」のコマンド名を設定します。
@default 使う

@param Command Discard Format
@desc 実行コマンドの「捨てる」のコマンド名を設定します。
@default 捨てる

@param Command Cancel Format
@desc 実行コマンドの「やめる」のコマンド名を設定します。
@default やめる

@param --確認画面--
@text --確認画面--

@param Enable Confirmation
@desc アイテム廃棄実行時に確認画面を表示するか。 1 - 表示する, 0 - 表示しない
@default 1

@param Conf Title Format
@desc アイテム廃棄実行時の確認内容を設定します。 %1 - アイテム名, %2 - 捨てる数
@default [%1]を[%2]個 捨てますか？

@param Confirmation Ok Format
@desc 確認コマンドの「実行する」のコマンド名を設定します。
@default 実行する

@param Confirmation Cancel Format
@desc 確認コマンドの「実行しない」のコマンド名を設定します。
@default 実行しない
*/

//=============================================================================

var Imported = Imported || {};
Imported.FTKR_EIB = true;

var FTKR = FTKR || {};
FTKR.EIB = FTKR.EIB || {};

(function () {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_ExItemBox');

    FTKR.EIB = {
        enable: {
            category: Number(parameters['Enable Category'] || 0),
            capacity: Number(parameters['Enable Capacity'] || 0),
            subcommand: Number(parameters['Enable SubCommand'] || 0),
        },
        disp: {
            maxCols: Number(parameters['Number of Columns'] || 0),
            spacing: Number(parameters['Horizontal Space'] || 0),
            lineHeight: Number(parameters['Window Line Height'] || 0),
            iconScale: Number(parameters['Icon Scale'] || 0),
            itemIcon: Number(parameters['Display Item Icon'] || 0),
            itemName: Number(parameters['Display Item Name'] || 0),
            fontsize: Number(parameters['Font Size'] || 0),
            number: Number(parameters['Display Item Number'] || 0),
            digit: Number(parameters['Display Number of Digit'] || 0),
            separator: String(parameters['Display Separator'] || ''),
            positionY: Number(parameters['Display Text Position Y'] || 0),
            category: Number(parameters['Enable Category'] || 0),
        },
        party: {
            category: String(parameters['Items Category'] || ''),
        },
        category: {
            all: String(parameters['Category All Name'] || ''),
        },
        capacity: {
            item: Number(parameters['Item Capacity'] || 0),
            weapon: Number(parameters['Weapon Capacity'] || 0),
            armor: Number(parameters['Armor Capacity'] || 0),
        },
        stack: {
            max: Number(parameters['Max Stack Number'] || 0),
            dup: Number(parameters['Enable Duplicate Stack'] || 0),
        },
        buy: {
            max: Number(parameters['Max Buy Number'] || 0),
        },
        subcom: {
            enableConf: Number(parameters['Enable Confirmation'] || 0),
            command: {
                use: String(parameters['Command Use Format'] || ''),
                discard: String(parameters['Command Discard Format'] || ''),
                cancel: String(parameters['Command Cancel Format'] || ''),
            },
            conf: {
                title: String(parameters['Conf Title Format'] || ''),
                okFormat: String(parameters['Confirmation Ok Format'] || ''),
                cancelFormat: String(parameters['Confirmation Cancel Format'] || ''),
            },
        },
    };

    //objのメモ欄から <metacode: x> の値を読み取って返す
    var readObjectMeta = function (obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function (metacode) {
            var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        });
        return match ? match[1] : '';
    };

    var convertEscapeCharacters = function (text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgNumber = function (arg) {
        try {
            var arg = convertEscapeCharacters(arg);
            return Number(eval(arg));
        } catch (e) {
            console.error(e);
            return 0;
        }
    };

    var calcValueCode = function (value1, value2, code) {
        switch ((code + '').toUpperCase()) {
            case '加算':
            case 'ADD':
            case '＋':
            case '+':
                return value1 + value2;
            case '減算':
            case 'SUBTRACT':
            case 'ー':
            case '-':
                return value1 - value2;
            case '積算':
            case 'MULTIPLY':
            case '×':
            case '*':
                return value1 * value2;
            case '除算':
            case 'DIVIDE':
            case '／':
            case '/':
                return value1 / value2;
            case '剰余':
            case 'MOD':
            case '％':
            case '%':
                return value1 % value2;
            case '代入':
            case 'SUBSTITUT':
            case '＝':
            case '=':
            default:
                return value2;
        }
    };

    //=============================================================================
    // プラグインコマンド
    //=============================================================================

    var _EIB_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _EIB_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/EIB_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '所持容量設定':
            case 'SET_CAPACITY':
                if (FTKR.EIB.enable.capacity) this.setItemBoxCapacity(args);
                break;
        }
    };

    Game_Interpreter.prototype.setItemBoxCapacity = function (args) {
        var arg = (args[0] + '').toUpperCase();
        switch (arg) {
            case 'アイテム':
            case 'ITEM':
                var oldvalue = $gameParty.itemsCapacityPlus();
                $gameParty.setItemsCapacityPlus(calcValueCode(oldvalue, setArgNumber(args[1]), args[2]));
                break;
            case '武器':
            case 'WEAPON':
                var oldvalue = $gameParty.weaponsCapacityPlus();
                $gameParty.setWeaponsCapacityPlus(calcValueCode(oldvalue, setArgNumber(args[1]), args[2]));
                break;
            case '防具':
            case 'ARMOR':
                var oldvalue = $gameParty.armorsCapacityPlus();
                $gameParty.setArmorsCapacityPlus(calcValueCode(oldvalue, setArgNumber(args[1]), args[2]));
                break;
            default:
                return;
        }
    };

    //=============================================================================
    // アイテムボックスの表示レイアウトの修正
    //=============================================================================

    //書き換え
    Window_ItemList.prototype.drawItemNumber = function (item, x, y, width) {
        if (this.needsNumber() && this.showNumber(item)) {
            var tw = this.textWidth('0') * this.itemNumberDigit();
            this.drawTextCustom(this.itemNumberSeparator(), x, y, width - tw, 'right');
            this.drawTextCustom(this.itemNumber(item), x, y, width, 'right');
        }
    };

    Window_ItemList.prototype.showNumber = function (item) {
        return FTKR.EIB.disp.number === 1 ||
            FTKR.EIB.disp.number === 2 && $gameParty.numItems(item) !== 1;
    };

    Window_ItemList.prototype.itemNumberDigit = function () {
        return FTKR.EIB.disp.digit;
    };

    Window_ItemList.prototype.itemNumberSeparator = function () {
        return FTKR.EIB.disp.separator;
    };

    Window_ItemList.prototype.itemNumber = function (item) {
        return FTKR.EIB.enable.capacity ? this._boxData[this._listIndex].number : $gameParty.numItems(item);
    };

    Window_ItemList.prototype.drawTextCustom = function (text, x, y, maxWidth, align) {
        var height = this.standardFontSize() + 8;
        y += FTKR.EIB.disp.positionY * (this.lineHeight() - height) / 2;
        this.contents.drawText(text, x, y, maxWidth, height, align);
    };

    //書き換え
    Window_ItemList.prototype.maxCols = function () {
        return FTKR.EIB.disp.maxCols;
    };

    //書き換え
    Window_ItemList.prototype.spacing = function () {
        return FTKR.EIB.disp.spacing;
    };

    //書き換え
    Window_ItemList.prototype.standardFontSize = function () {
        return FTKR.EIB.disp.fontsize;
    };

    //書き換え
    Window_ItemList.prototype.lineHeight = function () {
        var scale = FTKR.EIB.disp.iconScale / 100;
        return Math.max(FTKR.EIB.disp.lineHeight,
            Window_Base._iconHeight * scale + 4, FTKR.EIB.disp.fontsize + 8);
    };

    //書き換え
    Window_ItemList.prototype.drawItemName = function (item, x, y, width) {
        width = width || 312;
        if (item) {
            var scale = FTKR.EIB.disp.iconScale / 100;
            var iconBoxWidth = Window_Base._iconWidth * scale + 4;
            var diff = Math.max((this.lineHeight() - iconBoxWidth) / 2, 0);
            this.resetTextColor();
            if (FTKR.EIB.disp.itemIcon) {
                this.drawIconCustom(item.iconIndex, x + 2, y + 2 + diff, scale);
            } else {
                iconBoxWidth = 0;
            }
            if (FTKR.EIB.disp.itemName) this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };

    //アイコンの表示スケールを指定できる表示関数
    Window_ItemList.prototype.drawIconCustom = function (iconIndex, x, y, scale) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
    };

    //=============================================================================
    // アイテムボックスのカテゴリーを変更する
    //=============================================================================
    if (FTKR.EIB.enable.category) {

        //=============================================================================
        // DataManager
        // アイテムに詳細カテゴリーを設定する
        //=============================================================================

        var _EIB_DatabaseLoaded = false;
        var _EIB_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
        DataManager.isDatabaseLoaded = function () {
            if (!_EIB_DataManager_isDatabaseLoaded.call(this)) return false;
            if (!_EIB_DatabaseLoaded) {
                this.itemCategoryNotetags($dataItems);
                this.itemCategoryNotetags($dataWeapons);
                this.itemCategoryNotetags($dataArmors);
                _EIB_DatabaseLoaded = true;
            }
            return true;
        };

        DataManager.itemCategoryNotetags = function (group) {
            for (var n = 1; n < group.length; n++) {
                var obj = group[n];
                obj.category = readObjectMeta(obj, ['EIB_カテゴリー', 'EIB_CATEGORY']);
            }
        };

        TextManager.convertItemCategory = function (category) {
            switch (category) {
                case TextManager.item:
                    return 'item';
                case TextManager.weapon:
                    return 'weapon';
                case TextManager.armor:
                    return 'armor';
                case TextManager.keyItem:
                    return 'keyItem';
                case FTKR.EIB.category.all:
                    return 'all';
                default:
                    return category;
            }
        };

        //=============================================================================
        //Window_Item
        // アイテムボックスのカテゴリーを変更する
        //=============================================================================

        //書き換え
        Window_ItemCategory.prototype.makeCommandList = function () {
            var lists = FTKR.EIB.party.category.replace(/\s/g, '').split(',');
            for (var i = 0; i < lists.length; i++) {
                var command = TextManager[lists[i]] || FTKR.EIB.category[lists[i]] || lists[i];
                this.addCommand(command, lists[i]);
            }
        };

        //書き換え
        Window_ItemList.prototype.includes = function (item) {
            var lists = FTKR.EIB.party.category.replace(/\s/g, '').split(',');
            var category = FTKR.EIB.disp.category ? this._category : lists[0];
            switch (TextManager.convertItemCategory(category)) {
                case 'item':
                    return DataManager.isItem(item) && item.itypeId === 1;
                case 'weapon':
                    return DataManager.isWeapon(item);
                case 'armor':
                    return DataManager.isArmor(item);
                case 'keyItem':
                    return DataManager.isItem(item) && item.itypeId === 2;
                case 'all':
                    return this.isAllItems(item);
                default:
                    return item ? item.category === category : false;
            }
        };

        Window_ItemList.prototype.isAllItems = function (item) {
            return DataManager.isItem(item) ||
                DataManager.isWeapon(item) || DataManager.isArmor(item);
        }

        var _Scene_Item_createCategoryWindow = Scene_Item.prototype.createCategoryWindow;
        Scene_Item.prototype.createCategoryWindow = function () {
            _Scene_Item_createCategoryWindow.call(this);
            if (!FTKR.EIB.disp.category) {
                this._categoryWindow.hide();
                this._categoryWindow.deselect();
                this._categoryWindow.deactivate();
            }
        };


        var _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
        Scene_Item.prototype.createItemWindow = function () {
            _Scene_Item_createItemWindow.call(this);
            if (!FTKR.EIB.disp.category) {
                this._itemWindow.y = this._helpWindow.height;
                this._itemWindow.height = Graphics.boxHeight - this._itemWindow.y;
                this._itemWindow.activate();
                this._itemWindow.selectLast();
            }
        };

        var _Scene_Item_onItemCancel = Scene_Item.prototype.onItemCancel;
        Scene_Item.prototype.onItemCancel = function () {
            if (!FTKR.EIB.disp.category) {
                this._itemWindow.deselect();
                this.popScene();
            } else {
                _Scene_Item_onItemCancel.call(this);
            }
        };

        //=============================================================================
        //アイテム売却画面のカテゴリーの修正
        //=============================================================================
        var _Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
        Scene_Shop.prototype.createSellWindow = function () {
            _Scene_Shop_createSellWindow.call(this);
            if (!FTKR.EIB.disp.category) {
                this._sellWindow.y = this._dummyWindow.y;
                this._sellWindow.height = Graphics.boxHeight - this._sellWindow.y;
            }
        };

        var _Scene_Shop_activateSellWindow = Scene_Shop.prototype.activateSellWindow;
        Scene_Shop.prototype.activateSellWindow = function () {
            if (!FTKR.EIB.disp.category) {
                this._sellWindow.refresh();
                this._sellWindow.show();
                this._sellWindow.activate();
                this._statusWindow.hide();
            } else {
                _Scene_Shop_activateSellWindow.call(this);
            }
        };

        var _Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
        Scene_Shop.prototype.commandSell = function () {
            if (!FTKR.EIB.disp.category) {
                this._dummyWindow.hide();
                this._sellWindow.show();
                this._sellWindow.activate();
                this._sellWindow.select(0);
                this._sellWindow.refresh();
            } else {
                _Scene_Shop_commandSell.call(this);
            }
        };

        var _Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
        Scene_Shop.prototype.onSellCancel = function () {
            if (!FTKR.EIB.disp.category) {
                this._sellWindow.deselect();
                this._statusWindow.setItem(null);
                this._helpWindow.clear();
                this._commandWindow.activate();
                this._dummyWindow.show();
                this._sellWindow.hide();
            } else {
                _Scene_Shop_onSellCancel.call(this);
            }
        };

    }//カテゴリー

    //=============================================================================
    // アイテムボックスの所持容量とスタック設定を変更する
    //=============================================================================
    if (FTKR.EIB.enable.capacity) {

        //=============================================================================
        // アイテムボックスの仕様を変える
        // Game_Party
        //=============================================================================
        //------------------------------------------------------------------------
        //アイテムボックスのデータ保存形式を変更
        //------------------------------------------------------------------------
        //書き換え
        Game_Party.prototype.initAllItems = function () {
            this._items = [];
            this._weapons = [];
            this._armors = [];
            this._itemsCapacityPlus = 0;
            this._weaponsCapacityPlus = 0;
            this._armorsCapacityPlus = 0;
        };

        //書き換え
        Game_Party.prototype.items = function () {
            var list = [];
            this._items.forEach(function (item) {
                list.push($dataItems[item.id]);
            });
            return list;
        };

        //書き換え
        Game_Party.prototype.weapons = function () {
            var list = [];
            this._weapons.forEach(function (item) {
                list.push($dataWeapons[item.id]);
            });
            return list;
        };

        //書き換え
        Game_Party.prototype.armors = function () {
            var list = [];
            this._armors.forEach(function (item) {
                list.push($dataArmors[item.id]);
            });
            return list;
        };

        Game_Party.prototype.equipItemBoxs = function () {
            return this._weapons.concat(this._armors);
        };

        Game_Party.prototype.allItemBoxs = function () {
            return this._items.concat(this.equipItemBoxs());
        };

        //------------------------------------------------------------------------
        //アイテムの所持数の処理の修正
        //------------------------------------------------------------------------
        //書き換え
        Game_Party.prototype.numItems = function (item) {
            var list = this.dupItems(item);
            if (list) {
                return list.reduce(function (prev, current, i, arr) {
                    return prev + current.number;
                }, 0);
            }
            return 0;
        };

        Game_Party.prototype.dupItems = function (item) {
            var cont = [];
            var container = this.itemContainer(item);
            if (container) {
                cont = container.filter(function (box) {
                    return box.id === item.id;
                });
            }
            return cont;
        };

        Game_Party.prototype.numItem = function (item, index) {
            var container = this.itemContainer(item);
            return container && container[index] ? container[index].number : 0;
        };

        //書き換え
        Game_Party.prototype.maxItems = function (item) {
            var stack = Number(readObjectMeta(item, ['EIB_スタック', 'EIB_STACK'])) || FTKR.EIB.stack.max;
            return stack || 1;
        };

        //書き換え
        Game_Party.prototype.hasMaxItems = function (item) {
            return FTKR.EIB.stack.dup ? false : this.numItems(item) >= this.maxItems(item);
        };

        Game_Party.prototype.isEmptyStack = function (item) {
            if (!this.hasItem(item)) return false;
            var diff = this.maxItems(item) * this.dupItems(item).length - this.numItems(item);
            if (!FTKR.EIB.stack.dup) return diff;
            var rem = this.numItems(item) % this.maxItems(item);
            return diff ? this.maxItems(item) - rem : 0;
        };

        Game_Party.prototype.itemsCapacityPlus = function () {
            return this._itemsCapacityPlus || 0;
        };

        Game_Party.prototype.maxItemsCapacity = function () {
            return FTKR.EIB.capacity.item + this.itemsCapacityPlus();
        };

        Game_Party.prototype.isItemsCapacity = function () {
            return this.maxItemsCapacity() - this._items.length;
        };

        Game_Party.prototype.setItemsCapacityPlus = function (value) {
            this._itemsCapacityPlus = value;
        };

        Game_Party.prototype.weaponsCapacityPlus = function () {
            return this._weaponsCapacityPlus || 0;
        };

        Game_Party.prototype.maxWeaponsCapacity = function () {
            return FTKR.EIB.capacity.weapon + this.weaponsCapacityPlus();
        };

        Game_Party.prototype.isWeaponsCapacity = function () {
            return this.maxWeaponsCapacity() - this._weapons.length;
        };

        Game_Party.prototype.setWeaponsCapacityPlus = function (value) {
            this._weaponsCapacityPlus = value;
        };
        Game_Party.prototype.armorsCapacityPlus = function () {
            return this._armorsCapacityPlus || 0;
        };

        Game_Party.prototype.maxArmorsCapacity = function () {
            return FTKR.EIB.capacity.armor + this.armorsCapacityPlus();
        };

        Game_Party.prototype.isArmorsCapacityOk = function () {
            return this.maxArmorsCapacity() - this._armors.length;
        };

        Game_Party.prototype.setArmorsCapacityPlus = function (value) {
            this._armorsCapacityPlus = value;
        };
        Game_Party.prototype.isItemCapacityOk = function (item) {
            return this.isItemCapacity(item) > 0;
        };

        Game_Party.prototype.isItemCapacity = function (item) {
            var cap = FTKR.EIB.capacity;
            if (!item) {
                return false;
            } else if (DataManager.isItem(item)) {
                return !cap.item ? Infinity : Math.max(this.isItemsCapacity(), 0);
            } else if (DataManager.isWeapon(item)) {
                return !cap.weapon ? Infinity : Math.max(this.isWeaponsCapacity(), 0);
            } else if (DataManager.isArmor(item)) {
                return !cap.armor ? Infinity : Math.max(this.isArmorsCapacity(), 0);
            } else {
                return false;
            }
        };

        Game_Party.prototype.emptyNumber = function (item) {
            return this.isEmptyStack(item) + this.isItemCapacity(item) * this.maxItems(item);
        };

        //------------------------------------------------------------------------
        //アイテムの入手処理の修正
        //------------------------------------------------------------------------
        //書き換え
        Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
            if (this.hasItem(item) || this.isItemCapacityOk(item)) {
                var container = this.itemContainer(item);
                if (container) {
                    var lastNumber = this.numItems(item);
                    var newNumber = lastNumber + amount;
                    if (this.hasItem(item)) {
                        var number = newNumber;
                        container.forEach(function (box) {
                            if (box.id === item.id) {
                                box.number = number.clamp(0, this.maxItems(item));
                                number -= this.maxItems(item);
                            }
                        }, this);
                        if (number && FTKR.EIB.stack.dup) {
                            this.addItemBoxs(item, number);
                        }
                    } else {
                        this.addItemBoxs(item, amount);
                    }
                    for (var i = 0; i < container.length; i++) {
                        var box = container[i];
                        if (box && box.id === item.id && box.number === 0) {
                            container.splice(i, 1);
                            i -= 1;
                        }
                    }
                    if (includeEquip && newNumber < 0) {
                        this.discardMembersEquip(item, -newNumber);
                    }
                    $gameMap.requestRefresh();
                }
            }
        };

        Game_Party.prototype.addItemBoxs = function (item, number) {
            var container = this.itemContainer(item);
            var addNum = FTKR.EIB.stack.dup ? number : 1;
            for (var i = 0; i < addNum / this.maxItems(item); i++) {
                if (!this.isItemCapacityOk(item)) return;
                var newItem = {
                    id: item.id,
                    number: number.clamp(0, this.maxItems(item)),
                };
                container.push(newItem);
                number -= this.maxItems(item);
            }
        };

        //=============================================================================
        //アイテムボックスで表示する所持数の修正
        //=============================================================================

        var _Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
        Window_ItemList.prototype.drawItem = function (index) {
            this._listIndex = index;
            _Window_ItemList_drawItem.call(this, index);
        };

        var _Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
        Window_ItemList.prototype.makeItemList = function () {
            _Window_ItemList_makeItemList.call(this);
            this._boxData = $gameParty.allItemBoxs().filter(function (box, i) {
                return this.includes($gameParty.allItems()[i]);
            }, this);
            if (this.includes(null)) {
                this._boxData.push(null);
            }
        };

        //=============================================================================
        //アイテム売買の処理の修正
        //=============================================================================
        //容量以上に購入させない
        var _Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
        Window_ShopBuy.prototype.isEnabled = function (item) {
            return _Window_ShopBuy_isEnabled.call(this, item) &&
                ($gameParty.isEmptyStack(item) || $gameParty.isItemCapacityOk(item));
        };

        //書き換え
        Scene_Shop.prototype.maxBuy = function () {
            var max = $gameParty.hasItem(this._item) ?
                Math.min(FTKR.EIB.buy.max, $gameParty.emptyNumber(this._item)) :
                Math.min(FTKR.EIB.buy.max, $gameParty.maxItems(this._item));
            var price = this.buyingPrice();
            if (price > 0) {
                return Math.min(max, Math.floor(this.money() / price));
            } else {
                return max;
            }
        };

    }//所持容量

    //=============================================================================
    // サブコマンドの追加
    //=============================================================================
    if (FTKR.EIB.enable.subcommand) {

        //=============================================================================
        // アイテム画面の変更
        //=============================================================================

        Window_Selectable.prototype.actSelect = function (index) {
            this.activate();
            this.select(index);
            this.refresh();
        };

        var _EIB_Scene_Item_create = Scene_Item.prototype.create;
        Scene_Item.prototype.create = function () {
            _EIB_Scene_Item_create.call(this);
            this.createSubCommandWindow();
            this.createNumberWindow();
            if (FTKR.EIB.subcom.enableConf) {
                this.createConfTitleWindow();
                this.createConfWindow();
            }
        };

        //------------------------------------------------------------------------
        //サブコマンドの追加
        //------------------------------------------------------------------------
        //書き換え
        Window_ItemList.prototype.isEnabled = function (item) {
            return true;
        };

        Scene_Item.prototype.createSubCommandWindow = function () {
            var wy = this._itemWindow.y;
            var ww = 240;
            var wh = Graphics.boxHeight - wy;
            this._subCommandWindow = new Window_ItemSubCommand(0, wy, ww, wh);
            var window = this._subCommandWindow;
            window.setHandler('ok', this.onSubComOk.bind(this));
            window.setHandler('cancel', this.onSubComCancel.bind(this));
            window.hide();
            this.addWindow(window);
        };

        var _EIB_Scene_Item_onitemOk = Scene_Item.prototype.onItemOk;
        Scene_Item.prototype.onItemOk = function () {
            this._subCommandWindow._item = this._itemWindow.item();
            this._subCommandWindow.show();
            this._subCommandWindow.actSelect(0);
        };

        Scene_Item.prototype.onSubComOk = function () {
            switch (this._subCommandWindow.item().symbol) {
                case 'use':
                    this._subCommandWindow.hide();
                    _EIB_Scene_Item_onitemOk.call(this);
                    break;
                case 'discard':
                    var item = this._subCommandWindow._item;
                    this._numberWindow.setup(item, $gameParty.numItems(item));
                    this._numberWindow.show();
                    this._numberWindow.activate();
                    break;
                default:
                    this.onSubComCancel();
                    break;
            }
        };

        Scene_Item.prototype.onSubComCancel = function () {
            this._subCommandWindow.hide();
            this._subCommandWindow.deselect();
            this._numberWindow.hide();
            this._itemWindow.actSelect(this._itemWindow.index());
        };

        //------------------------------------------------------------------------
        //アイテムを捨てる処理の追加
        //------------------------------------------------------------------------
        Scene_Item.prototype.createNumberWindow = function () {
            var wy = this._itemWindow.y;
            var wx = this._subCommandWindow.width;
            var wh = Graphics.boxHeight - wy;
            this._numberWindow = new Window_ItemNumber(wx, wy, wh);
            this._numberWindow.hide();
            this._numberWindow.setHandler('ok', this.onNumberOk.bind(this));
            this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
            this.addWindow(this._numberWindow);
        };

        Scene_Item.prototype.onNumberOk = function () {
            if (FTKR.EIB.subcom.enableConf) {
                this._confTitleWindow.setItem(this._subCommandWindow._item, this._numberWindow.number());
                this._confTitleWindow.show();
                this._confWindow.show();
                this._confWindow.actSelect(0);
            } else {
                this.itemDiscard();
            }
        };

        Scene_Item.prototype.onNumberCancel = function () {
            this._numberWindow.hide();
            this._subCommandWindow.actSelect(this._subCommandWindow.index());
        };

        Scene_Item.prototype.itemDiscard = function () {
            SoundManager.playOk();
            $gameParty.gainItem(this._subCommandWindow._item, -this._numberWindow.number());
            this.onSubComCancel();
        };

        //------------------------------------------------------------------------
        //確認画面の追加
        //------------------------------------------------------------------------
        Scene_Item.prototype.createConfTitleWindow = function () {
            var wx = Graphics.boxWidth / 4;
            var wh = this._helpWindow.fittingHeight(1);
            var ww = Graphics.boxWidth / 2;
            var wy = Graphics.boxHeight / 2 - wh;
            this._confTitleWindow = new Window_ItemConfTitle(wx, wy, ww, wh);
            this._confTitleWindow.hide();
            this.addWindow(this._confTitleWindow);
        };

        Scene_Item.prototype.createConfWindow = function () {
            var ctw = this._confTitleWindow;
            var wx = ctw.x;
            var wy = ctw.y + ctw.height;
            var ww = ctw.width;
            var wh = this._helpWindow.fittingHeight(1);
            this._confWindow = new Window_ItemConf(wx, wy, ww, wh);
            this._confWindow.setHandler('ok', this.onConfirmationOk.bind(this));
            this._confWindow.setHandler('cancel', this.onConfirmationCancel.bind(this));
            this._confWindow.hide();
            this._confTitleWindow.setWindow(this._confWindow);
            this.addWindow(this._confWindow);
        };

        Scene_Item.prototype.onConfirmationOk = function () {
            if (this._confWindow.item().dicision) {
                this._confTitleWindow.hide();
                this._confWindow.hide();
                this._confWindow.deselect();
                this.itemDiscard();
            } else {
                this.onConfirmationCancel();
            }
        };

        Scene_Item.prototype.onConfirmationCancel = function () {
            this._confTitleWindow.hide();
            this._confWindow.hide();
            this._confWindow.deselect();
            this.onSubComCancel();
        };

        //=============================================================================
        // Window_ItemNumber
        //=============================================================================

        function Window_ItemNumber() {
            this.initialize.apply(this, arguments);
        }

        Window_ItemNumber.prototype = Object.create(Window_ShopNumber.prototype);
        Window_ItemNumber.prototype.constructor = Window_ItemNumber;

        Window_ItemNumber.prototype.refresh = function () {
            this.contents.clear();
            this.drawItemName(this._item, 0, this.itemY());
            this.drawMultiplicationSign();
            this.drawNumber();
            var width = this.width - this.standardPadding() * 2;
            this.drawText('/MAX ' + this._max, 0, this.itemY() + this.lineHeight(), width, 'right');
        };

        //=============================================================================
        // Window_ItemConfTitle
        //=============================================================================

        function Window_ItemConfTitle() {
            this.initialize.apply(this, arguments);
        }

        Window_ItemConfTitle.prototype = Object.create(Window_Base.prototype);
        Window_ItemConfTitle.prototype.constructor = Window_ItemConfTitle;

        Window_ItemConfTitle.prototype.initialize = function (x, y, width, height) {
            Window_Base.prototype.initialize.call(this, x, y, width, height);
            this._item = null;
            this._number = 0;
            this._confWindow = null;
            this.refresh();
        };

        Window_ItemConfTitle.prototype.refresh = function () {
            this.contents.clear();
            this.drawTitle();
        };

        Window_ItemConfTitle.prototype.drawTitle = function () {
            if (this._item) {
                var text = FTKR.EIB.subcom.conf.title.format(this._item.name, this._number);
                var width = this.drawTextEx(text, 0, 0);
                this.resizeWindow(width);
                this._confWindow.resizeWindow(width);
                this.drawTextEx(text, 0, 0);
            }
        };

        Window_ItemConfTitle.prototype.resizeWindow = function (width) {
            this.width = width + this.standardPadding() * 2;
            this.contents.resize(width, this.contentsHeight());
            this.x = (Graphics.boxWidth - this.width) / 2
        };

        Window_ItemConfTitle.prototype.setItem = function (item, number) {
            this._item = item;
            this._number = number;
            this.refresh();
        };

        Window_ItemConfTitle.prototype.setWindow = function (window) {
            this._confWindow = window;
        };

        //=============================================================================
        // Window_ItemConf
        // 確認用コマンドを表示・処理するウィンドウ
        //=============================================================================

        function Window_ItemConf() {
            this.initialize.apply(this, arguments);
        }

        Window_ItemConf.prototype = Object.create(Window_Selectable.prototype);
        Window_ItemConf.prototype.constructor = Window_ItemConf;

        Window_ItemConf.prototype.initialize = function (x, y, width, height) {
            Window_Selectable.prototype.initialize.call(this, x, y, width, height);
            this._data = [];
            this._enabled = false;
            this._dicision = false;
        };

        Window_ItemConf.prototype.maxCols = function () {
            return 2;
        };

        Window_ItemConf.prototype.maxItems = function () {
            return this._data ? this._data.length : 1;
        };

        Window_ItemConf.prototype.item = function () {
            return this._data && this.index() >= 0 ? this._data[this.index()] : null;
        };

        Window_ItemConf.prototype.makeItemList = function () {
            this._data = [
                { dicision: true, disp: FTKR.EIB.subcom.conf.okFormat },
                { dicision: false, disp: FTKR.EIB.subcom.conf.cancelFormat }
            ];
        };

        Window_ItemConf.prototype.isEnabled = function (index) {
            return true;
        };

        Window_ItemConf.prototype.isCurrentItemEnabled = function () {
            return this.isEnabled(this.index());
        };

        Window_ItemConf.prototype.drawItem = function (index) {
            var rect = this.itemRect(index);
            this.changePaintOpacity(this.isEnabled(index));
            this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
            this.changePaintOpacity(1);
        };

        Window_ItemConf.prototype.refresh = function () {
            this.makeItemList();
            this.createContents();
            this.drawAllItems();
        };

        Window_ItemConf.prototype.resizeWindow = function (width) {
            this.width = width + this.standardPadding() * 2;
            this.contents.resize(width, this.contentsHeight());
            this.x = (Graphics.boxWidth - this.width) / 2
            this.refresh();
        };

    }//さぶコマンド

}());//FTKR_ExItemBox.js END

//=============================================================================
// Window_ItemSubCommand
// スキル選択後の実行用コマンドを表示・処理するウィンドウ
//=============================================================================

function Window_ItemSubCommand() {
    this.initialize.apply(this, arguments);
}

Window_ItemSubCommand.prototype = Object.create(Window_Selectable.prototype);
Window_ItemSubCommand.prototype.constructor = Window_ItemSubCommand;

Window_ItemSubCommand.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
    this._enabled = false;
    this._item = null;
    this._symbol = '';
};

Window_ItemSubCommand.prototype.maxItems = function () {
    return this._data ? this._data.length : 1;
};

Window_ItemSubCommand.prototype.item = function () {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_ItemSubCommand.prototype.makeItemList = function () {
    this._data = [];
    if (!this._item) return;
    var sep = FTKR.EIB.subcom.command;
    this._data = [
        { symbol: 'use', enabled: $gameParty.canUse(this._item), disp: sep.use },
        { symbol: 'discard', enabled: this._item.itypeId !== 2, disp: sep.discard },
        { symbol: 'cancel', enabled: true, disp: sep.cancel },
    ];
};

Window_ItemSubCommand.prototype.isCurrentItemEnabled = function () {
    return this.isEnabled(this.index());
};

Window_ItemSubCommand.prototype.isEnabled = function (index) {
    return this._data[index].enabled;
};

Window_ItemSubCommand.prototype.drawItem = function (index) {
    var rect = this.itemRectForText(index);
    this.changePaintOpacity(this.isEnabled(index));
    this.drawText(this._data[index].disp, rect.x, rect.y, rect.width);
    this.changePaintOpacity(1);
};

Window_ItemSubCommand.prototype.refresh = function () {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_ItemSubCommand.prototype.setItem = function (item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

//EOF