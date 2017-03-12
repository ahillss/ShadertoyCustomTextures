# Shadertoy Custom Textures

Allows client side textures to be temporarily loaded into a shadertoy project. It is done by executing the javascript below on the shadertoy project page. Then you can drag and drop an image file from your computer onto one of the texture preview slots to load it. 

Note this only works for 2D textures, I haven't figured out the javascript for loading cube maps. Any image that is not to the power of two will be resized to the nearest power of two size.

The easiest way to use this is to make a javascript link on your bookmark bar that can be clicked while viewing a shadertoy project. Follow the [link here](http://andrewhills.github.io/ShadertoyCustomTextures/link.html) for a javascript link that you can drag onto your bookmark bar.

```javascript
void((function(){
    function nearestPow2(a){return Math.pow(2,Math.round(Math.log(a)/Math.log(2)));}
    for(var x=0;x<4;x++){
        (function(x){
            var dz=document.getElementById('myUnitCanvas'+x);
            dz.addEventListener('drop',(function(evt){
                evt.stopPropagation();
                evt.preventDefault();
                var fs=evt.dataTransfer.files;
                var f=fs[0];
                var reader=new FileReader();
                console.log('loading:'+escape(f.name));

                reader.onload=(function(theFile){
                    return function(e){
                        var fil=document.getElementById('mySamplerFilter'+x);
                        var wrp=document.getElementById('mySamplerWrap'+x);
                        var filVal=fil.options[fil.selectedIndex].value;
                        var wrpVal=wrp.options[wrp.selectedIndex].value;
                        var result=e.target.result;
                        var img=new Image();
                        img.src=result;
                        var imgPow2Width=nearestPow2(img.width);   
                        var imgPow2Height=nearestPow2(img.height);                        
                        if(img.width!=imgPow2Width||img.height!=imgPow2Height) {
                            console.log('resizing '+img.width+'=>'+imgPow2Width+','+img.height+'=>'+imgPow2Height);                            
                            var canvas=document.createElement('canvas');                            
                            var ctx=canvas.getContext('2d');
                            canvas.width=imgPow2Width;
                            canvas.height=imgPow2Height;
                            ctx.clearRect(0,0,imgPow2Width,imgPow2Height);
                            ctx.drawImage(img,0,0,imgPow2Width,imgPow2Height);
                            result=canvas.toDataURL();
                        }
                        gShaderToy.SetTexture(x,{
                            mSrc:result,mType:'texture',mID:1,
                            mSampler:{filter:filVal,wrap:wrpVal,vflip:'true',srgb:'false',internal:'byte'}});
                    }
                })(f);
                reader.readAsDataURL(f);
            }),false);
            dz.addEventListener('dragover',(function(evt){
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect='link';
            }),false);
        })(x);
    }
})());
```
