// panel/index.js
Editor.Panel.extend({
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  template: `
    <h2>自动化加密JSON配置文件</h2>
    <ui-button id="btn">点击</ui-button>
    <hr />
    <div>状态: <span id="label">--</span></div>
  `,

  $: {
    btn: '#btn',
    label: '#label',
  },

  ready () {
    this.$btn.addEventListener('confirm', () => {
      this.$label.innerText = 'donging...';
      let fs = require('fs');
      Editor.assetdb.queryAssets('db://assets/jsonSrc/*', 'json', (err, assetInfos) => {
        let count = 0;
        for (let i = 0; i < assetInfos.length; ++i) {
          let filePath = assetInfos[i].path;
          let fileUrl = assetInfos[i].url.toString();
          //Editor.log(fileUrl.toString());
          fileUrl = fileUrl.replace("jsonSrc", "resources/config");
          fileUrl = fileUrl.replace(".json", ".txt");
          //Editor.log(fileUrl);
          fs.readFile(filePath, (err, data)=>{
            if(err)
            {
              Editor.log(err);
            }
            else
            {
              let dest = window.btoa(data.toString());
              Editor.assetdb.createOrSave(fileUrl, dest, ()=>{
                count++;
                if(count == assetInfos.length)
                {
                  this.$label.innerText = 'complete!';
                }
              });
            }
          })
        }
      });
    });
  },
});