import {
  actionChannel,
  all,
  apply,
  call,
  cancel,
  cancelled,
  channel,
  check,
  cps,
  delay,
  effectTypes,
  flush,
  fork,
  func,
  getContext,
  join,
  makeIterator,
  notUndef,
  put,
  putResolve,
  race,
  select,
  setContext,
  sliding,
  spawn,
  stringableFunc,
  take,
  takeMaybe
} from "./chunk-KTWUVJ6G.js";
import "./chunk-G3PMV62Z.js";

// node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js
var done = function done2(value) {
  return {
    done: true,
    value
  };
};
var qEnd = {};
function safeName(patternOrChannel) {
  if (channel(patternOrChannel)) {
    return "channel";
  }
  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }
  if (func(patternOrChannel)) {
    return patternOrChannel.name;
  }
  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater, errorState, effect, nextState = startState;
  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }
    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }
  return makeIterator(next, function(error) {
    return next(null, error);
  }, name);
}
function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yFork = function yFork2(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };
  var action, setAction = function setAction2(ac) {
    return action = ac;
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: "q2",
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: "q1",
        effect: yFork(action)
      };
    }
  }, "q1", "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}
function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yFork = function yFork2(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };
  var yCancel = function yCancel2(task2) {
    return {
      done: false,
      value: cancel(task2)
    };
  };
  var task, action;
  var setTask = function setTask2(t) {
    return task = t;
  };
  var setAction = function setAction2(ac) {
    return action = ac;
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: "q2",
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return task ? {
        nextState: "q3",
        effect: yCancel(task)
      } : {
        nextState: "q1",
        effect: yFork(action),
        stateUpdater: setTask
      };
    },
    q3: function q3() {
      return {
        nextState: "q1",
        effect: yFork(action),
        stateUpdater: setTask
      };
    }
  }, "q1", "takeLatest(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}
function takeLeading(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yCall = function yCall2(ac) {
    return {
      done: false,
      value: call.apply(void 0, [worker].concat(args, [ac]))
    };
  };
  var action;
  var setAction = function setAction2(ac) {
    return action = ac;
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: "q2",
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: "q1",
        effect: yCall(action)
      };
    }
  }, "q1", "takeLeading(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}
function throttle(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }
  var action, channel$1;
  var yTake = function yTake2() {
    return {
      done: false,
      value: take(channel$1)
    };
  };
  var yFork = function yFork2(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };
  var yDelay = {
    done: false,
    value: delay(delayLength)
  };
  var setAction = function setAction2(ac) {
    return action = ac;
  };
  var setChannel = function setChannel2(ch) {
    return channel$1 = ch;
  };
  var needsChannel = !channel(patternOrChannel);
  if (!needsChannel) {
    setChannel(patternOrChannel);
  }
  return fsmIterator({
    q1: function q1() {
      var yActionChannel = {
        done: false,
        value: actionChannel(patternOrChannel, sliding(1))
      };
      return {
        nextState: "q2",
        effect: yActionChannel,
        stateUpdater: setChannel
      };
    },
    q2: function q2() {
      return {
        nextState: "q3",
        effect: yTake(),
        stateUpdater: setAction
      };
    },
    q3: function q3() {
      return {
        nextState: "q4",
        effect: yFork(action)
      };
    },
    q4: function q4() {
      return {
        nextState: "q2",
        effect: yDelay
      };
    }
  }, needsChannel ? "q1" : "q2", "throttle(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}
function retry(maxTries, delayLength, fn) {
  var counter = maxTries;
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }
  var yCall = {
    done: false,
    value: call.apply(void 0, [fn].concat(args))
  };
  var yDelay = {
    done: false,
    value: delay(delayLength)
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: "q2",
        effect: yCall,
        errorState: "q10"
      };
    },
    q2: function q2() {
      return {
        nextState: qEnd
      };
    },
    q10: function q10(error) {
      counter -= 1;
      if (counter <= 0) {
        throw error;
      }
      return {
        nextState: "q1",
        effect: yDelay
      };
    }
  }, "q1", "retry(" + fn.name + ")");
}
function debounceHelper(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }
  var action, raceOutput;
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yRace = {
    done: false,
    value: race({
      action: take(patternOrChannel),
      debounce: delay(delayLength)
    })
  };
  var yFork = function yFork2(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };
  var yNoop = function yNoop2(value) {
    return {
      done: false,
      value
    };
  };
  var setAction = function setAction2(ac) {
    return action = ac;
  };
  var setRaceOutput = function setRaceOutput2(ro) {
    return raceOutput = ro;
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: "q2",
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: "q3",
        effect: yRace,
        stateUpdater: setRaceOutput
      };
    },
    q3: function q3() {
      return raceOutput.debounce ? {
        nextState: "q1",
        effect: yFork(action)
      } : {
        nextState: "q2",
        effect: yNoop(raceOutput.action),
        stateUpdater: setAction
      };
    }
  }, "q1", "debounce(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}
var validateTakeEffect = function validateTakeEffect2(fn, patternOrChannel, worker) {
  check(patternOrChannel, notUndef, fn.name + " requires a pattern or channel");
  check(worker, notUndef, fn.name + " requires a saga parameter");
};
function takeEvery$1(patternOrChannel, worker) {
  if (true) {
    validateTakeEffect(takeEvery$1, patternOrChannel, worker);
  }
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}
function takeLatest$1(patternOrChannel, worker) {
  if (true) {
    validateTakeEffect(takeLatest$1, patternOrChannel, worker);
  }
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }
  return fork.apply(void 0, [takeLatest, patternOrChannel, worker].concat(args));
}
function takeLeading$1(patternOrChannel, worker) {
  if (true) {
    validateTakeEffect(takeLeading$1, patternOrChannel, worker);
  }
  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }
  return fork.apply(void 0, [takeLeading, patternOrChannel, worker].concat(args));
}
function throttle$1(ms, patternOrChannel, worker) {
  if (true) {
    check(patternOrChannel, notUndef, "throttle requires a pattern or channel");
    check(worker, notUndef, "throttle requires a saga parameter");
  }
  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }
  return fork.apply(void 0, [throttle, ms, patternOrChannel, worker].concat(args));
}
function retry$1(maxTries, delayLength, worker) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }
  return call.apply(void 0, [retry, maxTries, delayLength, worker].concat(args));
}
function debounce(delayLength, pattern, worker) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
    args[_key6 - 3] = arguments[_key6];
  }
  return fork.apply(void 0, [debounceHelper, delayLength, pattern, worker].concat(args));
}
export {
  actionChannel,
  all,
  apply,
  call,
  cancel,
  cancelled,
  cps,
  debounce,
  delay,
  effectTypes,
  flush,
  fork,
  getContext,
  join,
  put,
  putResolve,
  race,
  retry$1 as retry,
  select,
  setContext,
  spawn,
  take,
  takeEvery$1 as takeEvery,
  takeLatest$1 as takeLatest,
  takeLeading$1 as takeLeading,
  takeMaybe,
  throttle$1 as throttle
};
//# sourceMappingURL=redux-saga_effects.js.map
