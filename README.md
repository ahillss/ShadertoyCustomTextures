# Shadertoy Custom Texture

Some javascript code to allow the use of custom textures in [shadertoy](https://www.shadertoy.com). It works by executing  some javascript code on a shadertoy project page.

```javascript
for(var x=0;x<4;x++){
    (function(x){
        function handleFileSelect(evt){
            evt.stopPropagation();
            evt.preventDefault();
            var fs=evt.dataTransfer.files;
            var f=fs[0];
            var reader=new FileReader();

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

    })(x)
}
```

Minified:
```javascript
for(var x=0;x<4;x++)!function(a){function b(b){b.stopPropagation(),b.preventDefault();var c=b.dataTransfer.files,d=c[0],e=new FileReader;e.onload=function(b){return function(b){var c=document.getElementById("mySamplerFilter"+a),d=document.getElementById("mySamplerWrap"+a),e=c.options[c.selectedIndex].value,f=d.options[d.selectedIndex].value;gShaderToy.SetTexture(a,{mSrc:b.target.result,mType:"texture",mID:1,mSampler:{filter:e,wrap:f,vflip:"true",srgb:"false",internal:"byte"}})}}(d),e.readAsDataURL(d)}function c(a){a.stopPropagation(),a.preventDefault(),a.dataTransfer.dropEffect="copy"}var d=document.getElementById("myUnitCanvas"+a);d.addEventListener("dragover",c,!1),d.addEventListener("drop",b,!1)}(x);
```

As a link
[link](javascript:void((function(){for(var x=0;x<4;x++)!function(a){function b(b){b.stopPropagation(),b.preventDefault();var c=b.dataTransfer.files,d=c[0],e=new FileReader;e.onload=function(b){return function(b){var c=document.getElementById("mySamplerFilter"+a),d=document.getElementById("mySamplerWrap"+a),e=c.options[c.selectedIndex].value,f=d.options[d.selectedIndex].value;gShaderToy.SetTexture(a,{mSrc:b.target.result,mType:"texture",mID:1,mSampler:{filter:e,wrap:f,vflip:"true",srgb:"false",internal:"byte"}})}}(d),e.readAsDataURL(d)}function c(a){a.stopPropagation(),a.preventDefault(),a.dataTransfer.dropEffect="copy"}var d=document.getElementById("myUnitCanvas"+a);d.addEventListener("dragover",c,!1),d.addEventListener("drop",b,!1)}(x);})());)
