const loadData = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)
    const data = await res.json()
    const allData = data.posts
    showDisplayData(allData) 
    
}
 
  
const showDisplayData = (items) => {
    
    const newsCardContainer = document.getElementById('card-section')
    
    newsCardContainer.innerHTML = ''
    // console.log( items)
    items.forEach((item) => {
        console.log(item)  
         let countRead = '${item.author.isActive }'
          let red = countRead==true ? "rad":"green";

        const newsCard = document.createElement('div')
        newsCard.innerHTML = `
        <div class="bg-slate-300 lg:flex lg:w-[800px] rounded-2xl border-slate-400 border-2 mt-6">
                            <div class="indicator w-16 h-20 m-4 mt-10">
                            
                            <span class="indicator-item badge">${red}</span>
                                <img src="${item.image}" alt="">
                            </div>
                            <div class="py-8 px-2">
                                <div class="flex gap-8 font-semibold">
                                    <h1>${item.id} : <span>${item.category}</span></h1>
                                    <p class="">Author: <span>${item.author.name}</span></p>
                                </div>
                                <div class="mt-5 mb-8">
                                    <h1 class="text-2xl font-bold">${item.title}</h1>
                                    <p class="my-2">${item.description}</p>
                                </div>
                                <hr class="border-dashed border-2 border-slate-500 ">
                                <div class="flex mt-10 gap-12">
                                    <div class="flex gap-3 ">
                                        <i class="fa-regular fa-message mt-1.5 "></i>
                                        <span>${item.comment_count}</span>
                                    </div>
                                    <div class="flex gap-3 ">
                                        <i class="fa-regular fa-eye mt-1.5 "></i>
                                        <span>${item.view_count}</span>
                                    </div>
                                    <div class="flex gap-3 ">
                                        <i class="fa-regular fa-clock mt-1.5 "></i>
                                        <span>${item.posted_time}</span>
                                    </div>
                                    <div class="lg:ml-80">
                                        <button id="news-btn" onclick="handleButton('${item.title}','${item.view_count}')" class="bg-sky-400 w-10 h-10 rounded-full"><i
                                        class="fa-solid fa-envelope-open-text "></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
        `
        newsCardContainer.appendChild(newsCard) 
 
    }) 
    toggleLoadingSpinner(false)
}
 

// const countReading = document.getElementById('count-reading')
const readContainer = document.getElementById('read-section')
const handleButton = (title, price)=> {  
    console.log('button added')
    const readSection = document.createElement('div')
    readSection.innerHTML = `
    <div class="flex justify-between  bg-slate-100 mx-4 rounded-xl mb-2 p-4">
        <h1 class=" font-semibold w-72">${title}</h1>
        <div class="mt-2">
            <i class="fa-regular fa-eye mt-1.5 "></i>
            <span>${price}</span>
        </div>
    </div>
    `
    readContainer.appendChild(readSection) 

}



const searchHandler = () => {
    toggleLoadingSpinner(true)
    // console.log('search button added')
    const searchInput = document.getElementById('search-input')
    const searchText = searchInput.value;
    //  console.log(searchText)
    loadData(searchText)
}

const anotherCardContainer = document.getElementById('another-card-container')
const uploadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()


    data.forEach(data => {
        // console.log(data)
        const anotherContainer = document.createElement('div')
        anotherContainer.innerHTML = `
        <div class="card lg:w-96 bg-base-100 shadow-xl p-6  border-slate-400 border-2">
        <figure><img class="rounded-2xl mb-4"
                src="${data.cover_image}" alt="Shoes" /></figure>
        <div class="">
            <div class="flex ">
                <i class="fa-solid fa-briefcase m-1.5"></i>
                <p>${data.author.posted_date}</p>
            </div>
            <h1 class="font-bold mb-3">${data.title}</h1>
            <p>${data.description}</p>
            <div class="card-actions justify-end">
                <div class="flex">
                    <img class="w-16 h-16 rounded-full p-1 mt-4  "
                        src="${data.profile_image}" alt="">
                    <div class="mr-36 mt-4">
                        <h1 class="font-semibold">${data.author.name}</h1>
                        <p>${data.author.designation}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        anotherCardContainer.appendChild(anotherContainer)

    })
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner  = document.getElementById('loading-spinner')
   if(isLoading){
    loadingSpinner.classList.remove('hidden')
   }else{
    loadingSpinner.classList.add('hidden')
   }
}

uploadData()