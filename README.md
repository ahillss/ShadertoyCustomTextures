# Shadertoy Custom Textures

Allows client side textures to be temporarily loaded into a shadertoy project. It is done by executing the javascript below on the shadertoy project page. Then you can drag and drop an image file from your computer onto one of the texture preview slots to load it. 

Note this only works for 2D textures, I haven't figured out the javascript for loading cube maps.

The easiest way to use this is to make a javascript bookmark on your bookmark bar that can be clicked while viewing a shadertoy project. The [link here](http://andrewhills.github.io/ShadertoyCustomTextures/link.html) provides a javascript link that you can drag onto your bookmark bar.


```javascript
void((function(){
    for(var x=0;x<4;x++){
        (function(x){
            function handleFileSelect(evt){
                evt.stopPropagation();
                evt.preventDefault();
                var fs=evt.dataTransfer.files;
                var f=fs[0];
                var reader=new FileReader();

                console.log('loading '+escape(f.name));

                reader.onload=(function(theFile){
                    return function(e){
                        var fil=document.getElementById('mySamplerFilter'+x);
                        var wrp=document.getElementById('mySamplerWrap'+x);
                        var filVal=fil.options[fil.selectedIndex].value;
                        var wrpVal=wrp.options[wrp.selectedIndex].value;

                        gShaderToy.SetTexture(x,{
                            mSrc:e.target.result,mType:'texture',mID:1,
                            mSampler:{filter:filVal,wrap:wrpVal,vflip:'true',srgb:'false',internal:'byte'}});
                    }
                })(f);

                reader.readAsDataURL(f);

            }

            function handleDragOver(evt){
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect='copy';
            }

            var dz=document.getElementById('myUnitCanvas'+x);
            dz.addEventListener('dragover',handleDragOver,false);
            dz.addEventListener('drop',handleFileSelect,false);

        })(x);
    }
})());
```
