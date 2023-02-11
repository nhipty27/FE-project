
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist= $('.song__list-song')
const media=$('.media')
const cd=$('.media-img')
const audio= $('#audio')
const playBtn= $('.playing')
const progress=$('#progress')
const cdThumb=$('.media-img')
const nextbtn= $('.btn-next')
const prevbtn= $('.btn-pre')

const app= {
    currentIndex:0,
    isPlaying:false,
    isLike:false,
    songs:[
        {
            name:'Cưới Thôi',
            singer:'Masew',
            path:'./assets/music/song1.mp3',
            time:'3:02',
            img:'./assets/img/image1.jpg'
        },
        {
            name:'Ddudu Ddudu',
            singer:'Blackpink',
            path:'./assets/music/song2.mp3',
            time:'3:29',
            img:'./assets/img/img2.jpg'
        },{
            name:'Dumb Dumb',
            singer:'Jeon Somi',
            path:'./assets/music/song3.mp3',
            time:'2:29',
            img:'./assets/img/img3.jpg'
        }
        ,{
            name:'Next Level',
            singer:'Aespa',
            path:'./assets/music/song4.mp3',
            time:'3:41',
            img:'./assets/img/img4.jpeg'
        },
        {
            name:'Peek a boo',
            singer:'Red Velvet',
            path:'./assets/music/song5.mp3',
            time:'3:09',
            img:'./assets/img/img5.jpg'
        },
        {
            name:'Pingpong',
            singer:'HyunA & Dawn',
            path:'./assets/music/song6.mp3',
            time:'2:38',
            img:'./assets/img/img6.jpg'
        },
        {
            name:'Queen dom',
            singer:'Red Velvet',
            path:'./assets/music/song7.mp3',
            time:'3:01',
            img:'./assets/img/img7.jpg'
        },
        {
            name:'Sài Gòn đau lòng quá',
            singer:'Hứa Kim Tuyền',
            path:'./assets/music/song8.mp3',
            time:'5:08',
            img:'./assets/img/img8.jpg'
        },
        {
            name:'Solo',
            singer:'Jennie',
            path:'./assets/music/song9.mp3',
            time:'2:49',
            img:'./assets/img/img9.jpg'
        }
    ],
    renders: function(){
        const htmls = this.songs.map((song,index) => {
            return `
                <div class="song__list-play active1">
                    <div class="song__list-play-info">
                        <img src="${song.img}" alt="" class="song__list-play-img">
                        <div class="song__list-play-name">
                            <span class="song__list-play-head">${song.name}</span> 
                            <span class="song__list-play-singer">${song.singer}</span> 
                        </div>
                    </div>
                    <div class="song__list-time">${song.time}</div>
                    <div class="song__list-icon">
                        <i class="fas fa-microphone"></i>
                        <i class="fas fa-heart"></i>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML =htmls.join('')
    },
    renderr: function(){
        const a = this.songs[this.currentIndex]
        media.innerHTML = `
            <img src="${a.img}" alt="" class="media-img">
            <div class="media-name ">
                <marquee class="media_title--name" scrolldelay="130">${a.name}</marquee>
                <span class="media-singer">${a.singer}</span>
            </div>
            <div class="media-like active9">
                <i class="no-like far fa-heart"></i>
                <i class="liked fas fa-heart"></i>
            </div>
            <div class="media-selec">
                <i class="dots fas fa-ellipsis-h"></i>
            </div>
        `
        
    },
    defineProperties:function(){
        Object.defineProperty(this, 'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function(){
        const _this = this;
        
        //xu ly khi play
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            } else{

                audio.play()
            }
        }

        //khi bai hat play
        audio.onplay = function(){
            _this.isPlaying=true
            playBtn.classList.add('active-play')
        }

        //khi bai hat pause
        audio.onpause = function(){
            _this.isPlaying=false
            playBtn.classList.remove('active-play')
        }

        //khi bai hat thay doi tien do
        audio.ontimeupdate=function(){
            const time_start = $('.time__cur');
            const time_count = $('.time__max');
            time_count.innerText=`${_this.songs[_this.currentIndex].time}`
            if (audio.duration){
                const progresspercent=Math.floor(audio.currentTime/audio.duration *100)
                progress.value = progresspercent
                

            // Xử lý tính thời gian của bài hát  
            var e = Math.floor(audio.currentTime) ;
            var d = e%60;
            var b =  Math.floor(e/60);
            if(d<10){
               var c=0;
            }else{
                c="";
            }
            time_start.textContent = '0' + b +  ":" + c + d;

            var ee= Math.floor( audio.duration) ;
            var dd = ee%60;
            var bb =  Math.floor(ee/60);
            if(dd<10){
               var cc=0;
            }else{
                cc="";
            }

            time_count.innerHTML =  '0' + bb +  ":" + cc + dd;
        }}

        //khi bai hat tua
        progress.oninput=function(event){
            const seektime= event.target.value * audio.duration/100
            audio.currentTime = seektime
            audio.play()
         }

         //khi next bai hai
         nextbtn.onclick = function(){
             _this.nextSong()
             audio.play()
            _this.renderr()
            // _this.scrollToActiveSong()
         }

         prevbtn.onclick = function(){
            _this.prevSong()
            audio.play()
           _this.renderr()
           // _this.scrollToActiveSong()
        }

    },

    loadCurrentSong: function(){
        audio.src = this.currentSong.path
        this.renderr()
    },

    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length)
            this.currentIndex = 0
        this.loadCurrentSong()
    },

    prevSong: function(){
        --this.currentIndex 
        if(this.currentIndex<0)
            this.currentIndex = this.songs.length -1
        this.loadCurrentSong()
    },

    start: function(){
        // dinh nghia cac thuoc tinh
        this.defineProperties()

        // lang nghe xu ly event
        this.handleEvent()

        //Tai bai hat dau
        this.loadCurrentSong()


        //render playlist
        this.renders()
        this.renderr()

    }
}

app.start()