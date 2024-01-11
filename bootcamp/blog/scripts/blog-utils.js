const blogContainer = document.getElementById('blog-container')

let blogsData = []

// create DOM div with new html
function createDOMDiv(blog) {
  // convert blog.publishedDate to date format dd/mm/yyyy
  const date = new Date(blog.publishedDate)
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`

  const newDiv = document.createElement('div')
  newDiv.classList.add('flex', 'gap-6', 'w-full')
  newDiv.innerHTML = `
  <img
    src="${blog.imageUrl}"
    alt="feature image 1"
  />
  <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
    <h3 class="text-2xl font-semibold">${blog.title}</h3>
    <p class="text-xl font-light">
      ${blog.description}
    </p>
    <p>
      At ${formattedDate}
    </p>
    <a href="${blog.url}">Read more</a>
  </div>`
  return newDiv
}

// use result from createDOMDiv() to append to blogContainer
function createBlog(blogs) {
  blogs.forEach((blog) => {
    blogContainer.append(createDOMDiv(blog))
  })
}

async function main() {
  // fetch data from blogs.json
  try {
    const response = await fetch('/scripts/blogs.json')
    blogsData = await response.json()
    createBlog(blogsData)
  } catch (error) {
    console.log(error)
  }
}

main()


/* ข้อ 2: สามารถค้นหาและเรียงข้อมูลตามเวลาได้ */
let typingTimer
const doneTypingInterval = 1000

// for use in HTML
function searchBlogs(element) {
  clearTimeout(typingTimer) // Clear the timer so it starts fresh
  const searchTerm = element.value
  blogContainer.innerHTML = 'Loading...'
  typingTimer = setTimeout(function () {
    blogContainer.innerHTML = ''
    const filteredBlogs = blogsData.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    createBlog(filteredBlogs)
  }, doneTypingInterval)
}


function sortBlogs(element) {
  blogContainer.innerHTML = ''
  const sortBy = element.value
  const sortedBlogs = [...blogsData].sort((a, b) => {
    let dateA = new Date(a.publishedDate)
    let dateB = new Date(b.publishedDate)
    if (sortBy === 'asc') {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  })
  createBlog(sortedBlogs)
}

/* ข้อ 2: จบส่วน code */