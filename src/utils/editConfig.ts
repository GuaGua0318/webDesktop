//富文本编辑器的配置

export const editConfig = {
  height: "58vh", //高度
  heightMax:"58vh",
  // heightMin:"48vh",
  charCounterCount: false, //字符计算器
  fileUpload: false,
  borderRadius:'0',
  toolbarButtons: {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "inlineClass",
        "inlineStyle",
        "clearFormatting",
      ],
    },

    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "formatOLSimple",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote",
      ],
    },

    save: {
      buttons: ["save"],
    },

    moreRich: {
      buttons: [
        "insertLink",
        "insertImage",
        // "insertVideo",
        "insertTable",
        "emoticons",
        "fontAwesome",
        "specialCharacters",
        "embedly",
        "insertFile",
        "insertHR",
      ],
    },

    moreMisc: {
      buttons: [
        "undo",
        "redo",
        "fullscreen",
        // "print",
        // "getPDF",
        "spellChecker",
        "selectAll",
        "html",
        "help",
      ],

      align: "right",

      buttonsVisible: 2,
    },
  },
};
