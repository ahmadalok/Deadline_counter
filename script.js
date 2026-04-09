const setBtn = document.getElementById('set-btn')
const resetBtn = document.getElementById('reset-btn')
const projectNameInput = document.getElementById('project-name')
const deadlineDateInput = document.getElementById('deadline-date')
const projectTitle = document.getElementById('project-title')
const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')
const messageEl = document.getElementById('message')

let countdown

function startCountdown(dateString) {
  const parts = dateString.split('-')
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[2], 10)
  const deadline = new Date(year, month, day)

  countdown = setInterval(function() {
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()

    if (diff <= 0) {
      clearInterval(countdown)
      daysEl.textContent = '0'
      hoursEl.textContent = '0'
      minutesEl.textContent = '0'
      secondsEl.textContent = '0'
      messageEl.textContent = '💀 Deadline has passed!'
      resetBtn.style.display = 'block'
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    daysEl.textContent = days
    hoursEl.textContent = hours
    minutesEl.textContent = minutes
    secondsEl.textContent = seconds
    messageEl.textContent = ''

  }, 1000)
}

setBtn.addEventListener('click', function() {
  const projectName = projectNameInput.value
  const deadlineDate = deadlineDateInput.value

  if (projectName === '' || deadlineDate === '') {
    alert('Please fill in both fields!')
    return
  }

  projectTitle.textContent = '🔥 ' + projectName

  if (countdown) {
    clearInterval(countdown)
  }

  startCountdown(deadlineDate)
  resetBtn.style.display = 'block'
})

resetBtn.addEventListener('click', function() {
  clearInterval(countdown)

  projectTitle.textContent = ''
  daysEl.textContent = '0'
  hoursEl.textContent = '0'
  minutesEl.textContent = '0'
  secondsEl.textContent = '0'
  messageEl.textContent = ''

  projectNameInput.value = ''
  deadlineDateInput.value = ''

  resetBtn.style.display = 'none'
})