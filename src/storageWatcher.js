
  /*
    Check for equality of two objects
  */
  const isEqual = (a, b) => {

    // Grab a clone of both
    const _a = clone(a), _b = clone(b)

    // Delete length property of window.localStorage
    delete _a.length
    delete _b.length

    // Check for equality by mapping
    for (var i in _b) {
      if (!(i in _a) || (_a[i] !== _b[i])) return false
    }

    return true

  }

  /*
    Diff of two objects a, b
  */

  const diff = (a, b) => {
    var _a = clone(a), _b = clone(b)

    var _diff = []

    delete _a.length
    delete _b.length

    if (isEqual(_a, _b)) return false

    for (var i in _b) {
      if (!(i in _a) || (_a[i] !== _b[i])) {
        _diff.push('' + i + ': ' + _a[i] + ' ==> ' + _b[i])
      }
    }

    return _diff
  }

  /*
    Clone Object
  */
  const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }

  /*
    Merge two objects a, b
  */
  const merge = (a, b) => {
    for (var key in b) { a[key] = b[key] }
      return a
  }

  /*
    Clone window.localStorage
  */
  const cloneStorage = () => {
    var _clone = clone(window.localStorage)
    delete _clone.length
    return _clone
  }

  /* variables */
  // const interval, start, stop, isRunning = false, configure, settings, log, lastStorage = cloneStorage()
  let isRunning = false
  let lastStorage = cloneStorage()

  // Default Settings
  let settings = {
    duration: 1500,
    verbose: true,
    logType: 'info'
  }

  /* Logger */
  const log = (msg) => {

    var _child = document.createElement('div')

    // Do nothing in case verbose is off
    if (!settings.verbose) return false
    
    // Support array of multiple messages
    if (Array.isArray(msg)) msg.map(function(m) {
      console[settings.logType](m);
    })
    // Single message
    else {
      console[settings.logType](msg)
    }

  }
  
  /* Configure watcher and change settings */
  const configure = (setts) => {
    settings = merge(settings, setts)
    log([`configured watcher to`, settings])
  }

  /* Start watcher */
  let interval
  const start = () => {

    if (isRunning) {
      log('Start request rejetced because the watcher is already running')
      return false
    }

    // Set state
    isRunning = true

    // Assign interval
    interval = setInterval(() => {
      if (!isEqual(lastStorage, window.localStorage)) {
        log(['storage changed', diff(lastStorage, window.localStorage)])
        lastStorage = cloneStorage()
      }
      else {
        log('No change')
      }
    }, settings.duration)

    log('watcher started')
  }

  /* Stop watcher */
  const stop = () => {
    isRunning = false
    clearInterval(interval)
    log('watcher stopped')
  }

export { configure, start, stop, lastStorage }