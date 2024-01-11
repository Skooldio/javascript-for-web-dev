const featureContainer = document.getElementById('feature-container')
const workContainer = document.getElementById('work-container')

let featuresData = []

// create DOM div with new html
function createFeatureDOMDiv(feature, position) {
  const newDiv = document.createElement('div')
  newDiv.classList.add('flex', 'gap-6', 'w-full')
  if (position % 2 !== 0) {
    newDiv.classList.add('flex-row-reverse')
  }
  newDiv.innerHTML = `
  <img
    src="${feature.imageUrl}"
    alt="${feature.altText}"
  />
  <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
    <h3 class="text-2xl font-semibold">${feature.title}</h3>
    <p class="text-2xl font-light">${feature.description}</p>
  </div>`
  return newDiv
}

// use result from createDOMDiv() to append to blogContainer
function createFeature(features) {
  features.forEach((feature, index) => {
    featureContainer.append(createFeatureDOMDiv(feature, index))
  })
}

function createWorkDOMDiv(work) {
  const newImg = document.createElement('img')
  newImg.classList.add('w-full', 'object-cover')
  newImg.alt = work.altText
  newImg.src = work.imageUrl
  return newImg
}

function createWork(works) {
  works.forEach((work) => {
    workContainer.append(createWorkDOMDiv(work))
  })
}

async function mainContent() {
  // fetch data from blogs.json
  try {
    const featureResponse = await fetch('/scripts/features.json')
    featuresData = await featureResponse.json()
    createFeature(featuresData)

    const workResponse = await fetch('/scripts/works.json')
    worksData = await workResponse.json()
    createWork(worksData)

  } catch (error) {
    console.log(error)
  }
}

mainContent()
