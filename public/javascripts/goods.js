/**
 * Created by e on 17/4/10.
 */

$(function() {
    //删除图片
    $('.cover-wall').on('click', '.operate', function() {
        //获取要删除的图片名  注意应该是public下一层路径开始
        let src = $(this).prev().attr('src');
        const params = {
            src: src,
        };
        $.post('/deleteFile', params);
        $(this).parent().remove();
    });
    //删除文件或视频  以文件为例
    $('.file_list').on('click', '.deleteFile', function() {
        //获取要删除的图片名  注意应该是public下一层路径开始
        let src = $(this).prev().text().trim();
        const params = {
            src: src,
        };
        $.post('/deleteFile', params);
        $(this).prev().remove();
        $(this).remove();
    });
    //跳转下载页面
    $('#download').click(function() {
        if (!$('.fileName').length) {
            alert('请选择文件');
            return ;
        }
        const _file = $('.fileName').text();
        window.open(`${'/word/' + _file}`, '_blank');
    });
//封面上传
//先判断上传文件格式是否符合规定 .jpeg .jpg .png .gif四种
    $('.cover-wall').on('change', '.choose-container', function(e){
        const c = confirm('确定上传该图片');
        if (c) {
            var le=$('.inputFile').val().split('.')[1];
            if(le=='jpeg'||le=='png'||le=='gif'||le=='jpg'){
                var formData = new FormData($('#img-upload')[0]);
                $.ajax({
                    type: 'post',
                    url: '/upload/uploadImages',
                    data: formData,
                    dataType: 'json',
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success:function(data){
                        showResult('图片上传成功');
                        const img = `<div class="img-container"><img class="show" src=${data.image} /><p class="operate">删除</p></div>`;
                        $('.cover-wall').append(img);
                        $('.choose-container').remove();
                        const upload = `<div class="img-container choose-container"><form id="img-upload" enctype="multipart/form-data">
                            <input type="file" class="inputFile upload" name="inputFile">
                            <img src="/images/addPic.png" class="toolUpload" alt="">
                        </form></div>`;
                        $('.cover-wall').prepend(upload);
                    },
                    error:function(err){
                        showResult('服务器异常,请重试');
                    }
                })
            }else{
                showResult('图片格式不正确');
            }
        } else {
            $('.choose-container').remove();
            const upload = `<div class="img-container choose-container"><form id="img-upload" enctype="multipart/form-data">
                            <input type="file" class="inputFile upload" name="inputFile">
                            <img src="/images/news/addPic.png" class="toolUpload" alt="">
                        </form></div>`;
            $('.cover-wall').prepend(upload);
        }
    });
//上传文件
    $('.file-wall').on('change', '.file-container', function(e){
        if ($('.fileName').length) {
            //如果已经上传了文件 手动删除
            alert('请删除已上传文件');
        } else {
            const c = confirm('确定上传该图片');
            if (c) {
                var le = $(this).find('.inputFile').val().split('.')[1];
                if(le =='doc' || le == 'docs'){
                    var formData = new FormData($('#file-upload')[0]);
                    $.ajax({
                        type: 'post',
                        url: '/upload/uploadFiles',
                        data: formData,
                        dataType: 'json',
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success:function(data){
                            showResult('文件上传成功');
                            const _file = `<p class="fileName">${data.fileName.split('word/')[1]}</p><img class="deleteFile" src="/images/delete.png" />`;
                            $('.file_list').empty().append(_file);
                            $('.file-container').remove();
                            const upload = `<div class="file-container"><form id="file-upload" enctype="multipart/form-data">
                            <input type="file" class="inputFile upload" name="inputFile">
                            <img src="/images/addPic.png" class="toolUpload" alt="">
                        </form></div>`;
                            $('.file-wall').prepend(upload);
                        },
                        error:function(err){
                            showResult('服务器异常,请重试');
                        }
                    })
                }else{
                    showResult('图片格式不正确');
                }
            } else {
                $('.choose-container').remove();
                const upload = `<div class="file-container"><form id="file-upload" enctype="multipart/form-data">
                            <input type="file" class="inputFile upload" name="inputFile">
                            <img src="/images/news/addPic.png" class="toolUpload" alt="">
                        </form></div>`;
                $('.cover-wall').prepend(upload);
            }
        }
    });
//保存文章
    $('.save').click(function() {
        doPost();
    });
});

function doPost() {
    let params = getParams();
    if (checkEmpty(params)) {
        const url = '/';      //富文本存出接口--
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                if (result) {
                    showResult('保存成功~');
                    setTimeout(function() {
                        window.close();
                    }, 1000);
                } else {
                    showResult('网络异常请重试~');
                }
            })
    } else {
        showResult('请检查信息是否填写完整');
    }
}

//获取表单参数  不能序列化 富文本会乱码
function getParams(){
    //先遍历cover
    let cover = [];
    $('.show').each(function(i) {
        cover.push($(this).attr('src'));
    });
    let data = {
        cover: cover.join(','),           //上传的图片String    ','分隔    ---->   a.jpg,b.png
        content: editor.getContent(),     //富文本内容
    };
    console.log(data);
    return data;
}
/*
* @params
* src: 文件名(绝对路径)
* */
function deleteFiles (src) {

}

//检查表单是否为空
function checkEmpty(data) {
    for (let i in data) {
        if (data[i] == '') {
            return false;
        }
    }
    return true;
}
function showResult(b){
    $('.word').text(b);
    $('.showResult').animate({'opacity':'1'},100,function(){
        $(this).animate({'opacity':'0'},1000);
    })
}