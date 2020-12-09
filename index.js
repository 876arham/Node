const p = require('puppeteer');
var fs = require('fs');
//const imageDownloader = require('node-image-downloader')
 


//create a file named mynewfile1.txt:


(async () => {

    let movieurl='https://www.amazon.com/s?i=pantry&srs=7301146011&bbn=8422704011&rh=n%3A8422704011%2Cn%3A%2116310211%2Cn%3A16322721%2Cn%3A11437481011&dc&fst=as%3Aoff&pf_rd_i=8422705011&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=004325cb-0f2a-4ed1-9b2c-cd9efb006271&pf_rd_r=DGK3DP2ABKH0K7PD7JGQ&pf_rd_s=merchandised-search-2&pf_rd_t=101&qid=1564179794&rnid=16322721&ref=PNTRY_OS_OTH_DPSubnavSnacksNuts';

    let browser=await p.launch();

    let page=await browser.newPage();
    await page.goto(movieurl,{waitUntil: 'networkidle2'});
    var ans;
   

    let data=await page.evaluate(()=>{
    
      // for(var i=1;i<=48;i++){
        ans=document.querySelectorAll('.s-image-square-aspect');
        var i=0;
        var out=[];
        for (i = 0; i < ans.length; i++) {
            
            out.push(ans[i].innerHTML)
          }
        return out;
       
       
        //return ans;
      
        
    });
    var op=[];
   
    
    for(var i=0;i<data.length;i++){
        var l=data[i].toString()
        var link=""
        var text=""
        for(var j=0;i<l.length;j++){
          if(l[j]==='<'){
            j=j+10;
            
            while(l[j]!='"'){
              link=link+l[j];
              j++;
            }
            j=j+23;
            while(l[j]!='"')
            {
              text=text+l[j];
              j++;
            }
            break;
          }
        }
     
        let stor={
            "link":link,
            "text":text
        }
      
        const imageDownloader = require('node-image-downloader')

        imageDownloader({
          imgs: [
            {
              uri: link,
              filename: text
            }
            
          ],
          dest: './images', //destination folder
        })
          .then((info) => {
            console.log('all done', info)
          })
          .catch((error, response, body) => {
            console.log('something goes bad!')
            console.log(error)
          })
      
        var val=JSON.stringify(stor,null,4);
        fs.appendFile('op.json', val, (err) => {
          // throws an error, you could also catch it here
          if (err) throw err;
      
          // success case, the file was saved
          console.log('Data saved!');
      });
        op.push(stor); 
       
       
    }
   
    console.log(op);
    
    debugger;
    await browser.close();
    
})();

