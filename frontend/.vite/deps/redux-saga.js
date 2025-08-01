import {
  ACTION_CHANNEL,
  ALL,
  CALL,
  CANCEL,
  CANCEL2,
  CANCELLED,
  CHANNEL_END_TYPE,
  CPS,
  FLUSH,
  FORK,
  GET_CONTEXT,
  IO,
  JOIN,
  MATCH,
  MULTICAST,
  PUT,
  RACE,
  SAGA_ACTION,
  SAGA_LOCATION,
  SELECT,
  SELF_CANCELLATION,
  SET_CONTEXT,
  TAKE,
  TASK,
  TASK_CANCEL,
  TERMINATE,
  _extends,
  array,
  assignWithSymbols,
  asyncIteratorSymbol,
  buffer,
  buffers,
  channel,
  check,
  compose,
  createAllStyleChildCallbacks,
  createEmptyArray,
  createSetContextWarning,
  detach,
  expanding,
  flatMap,
  func,
  getLocation,
  getMetaInfo,
  identity,
  internalErr,
  iterator,
  kTrue,
  logError,
  makeIterator,
  none,
  noop,
  notUndef,
  object,
  once,
  promise,
  remove,
  shouldCancel,
  shouldComplete,
  shouldTerminate,
  string,
  stringableFunc,
  symbol,
  undef,
  wrapSagaDispatch
} from "./chunk-KTWUVJ6G.js";
import "./chunk-G3PMV62Z.js";

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

// node_modules/@redux-saga/deferred/dist/redux-saga-deferred.esm.js
function deferred() {
  var def = {};
  def.promise = new Promise(function(resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
}
var redux_saga_deferred_esm_default = deferred;

// node_modules/@redux-saga/core/dist/redux-saga-core.esm.js
var queue = [];
var semaphore = 0;
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}
function asap(task) {
  queue.push(task);
  if (!semaphore) {
    suspend();
    flush();
  }
}
function immediately(task) {
  try {
    suspend();
    return task();
  } finally {
    flush();
  }
}
function suspend() {
  semaphore++;
}
function release() {
  semaphore--;
}
function flush() {
  release();
  var task;
  while (!semaphore && (task = queue.shift()) !== void 0) {
    exec(task);
  }
}
var array2 = function array3(patterns) {
  return function(input) {
    return patterns.some(function(p) {
      return matcher(p)(input);
    });
  };
};
var predicate = function predicate2(_predicate) {
  return function(input) {
    return _predicate(input);
  };
};
var string2 = function string3(pattern) {
  return function(input) {
    return input.type === String(pattern);
  };
};
var symbol2 = function symbol3(pattern) {
  return function(input) {
    return input.type === pattern;
  };
};
var wildcard = function wildcard2() {
  return kTrue;
};
function matcher(pattern) {
  var matcherCreator = pattern === "*" ? wildcard : string(pattern) ? string2 : array(pattern) ? array2 : stringableFunc(pattern) ? string2 : func(pattern) ? predicate : symbol(pattern) ? symbol2 : null;
  if (matcherCreator === null) {
    throw new Error("invalid pattern: " + pattern);
  }
  return matcherCreator(pattern);
}
var END = {
  type: CHANNEL_END_TYPE
};
var isEnd = function isEnd2(a) {
  return a && a.type === CHANNEL_END_TYPE;
};
var CLOSED_CHANNEL_WITH_TAKERS = "Cannot have a closed channel with pending takers";
var INVALID_BUFFER = "invalid buffer passed to channel factory function";
var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";
function channel2(buffer$1) {
  if (buffer$1 === void 0) {
    buffer$1 = expanding();
  }
  var closed = false;
  var takers = [];
  if (true) {
    check(buffer$1, buffer, INVALID_BUFFER);
  }
  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw internalErr(CLOSED_CHANNEL_WITH_TAKERS);
    }
    if (takers.length && !buffer$1.isEmpty()) {
      throw internalErr("Cannot have pending takers with non empty buffer");
    }
  }
  function put(input) {
    if (true) {
      checkForbiddenStates();
      check(input, notUndef, UNDEFINED_INPUT_ERROR);
    }
    if (closed) {
      return;
    }
    if (takers.length === 0) {
      return buffer$1.put(input);
    }
    var cb = takers.shift();
    cb(input);
  }
  function take(cb) {
    if (true) {
      checkForbiddenStates();
      check(cb, func, "channel.take's callback must be a function");
    }
    if (closed && buffer$1.isEmpty()) {
      cb(END);
    } else if (!buffer$1.isEmpty()) {
      cb(buffer$1.take());
    } else {
      takers.push(cb);
      cb.cancel = function() {
        remove(takers, cb);
      };
    }
  }
  function flush2(cb) {
    if (true) {
      checkForbiddenStates();
      check(cb, func, "channel.flush' callback must be a function");
    }
    if (closed && buffer$1.isEmpty()) {
      cb(END);
      return;
    }
    cb(buffer$1.flush());
  }
  function close() {
    if (true) {
      checkForbiddenStates();
    }
    if (closed) {
      return;
    }
    closed = true;
    var arr = takers;
    takers = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      var taker = arr[i];
      taker(END);
    }
  }
  return {
    take,
    put,
    flush: flush2,
    close
  };
}
function eventChannel(subscribe, buffer2) {
  if (buffer2 === void 0) {
    buffer2 = none();
  }
  var closed = false;
  var unsubscribe;
  var chan = channel2(buffer2);
  var close = function close2() {
    if (closed) {
      return;
    }
    closed = true;
    if (func(unsubscribe)) {
      unsubscribe();
    }
    chan.close();
  };
  unsubscribe = subscribe(function(input) {
    if (isEnd(input)) {
      close();
      return;
    }
    chan.put(input);
  });
  if (true) {
    check(unsubscribe, func, "in eventChannel: subscribe should return a function to unsubscribe");
  }
  unsubscribe = once(unsubscribe);
  if (closed) {
    unsubscribe();
  }
  return {
    take: chan.take,
    flush: chan.flush,
    close
  };
}
function multicastChannel() {
  var _ref;
  var closed = false;
  var currentTakers = [];
  var nextTakers = currentTakers;
  function checkForbiddenStates() {
    if (closed && nextTakers.length) {
      throw internalErr(CLOSED_CHANNEL_WITH_TAKERS);
    }
  }
  var ensureCanMutateNextTakers = function ensureCanMutateNextTakers2() {
    if (nextTakers !== currentTakers) {
      return;
    }
    nextTakers = currentTakers.slice();
  };
  var close = function close2() {
    if (true) {
      checkForbiddenStates();
    }
    closed = true;
    var takers = currentTakers = nextTakers;
    nextTakers = [];
    takers.forEach(function(taker) {
      taker(END);
    });
  };
  return _ref = {}, _ref[MULTICAST] = true, _ref.put = function put(input) {
    if (true) {
      checkForbiddenStates();
      check(input, notUndef, UNDEFINED_INPUT_ERROR);
    }
    if (closed) {
      return;
    }
    if (isEnd(input)) {
      close();
      return;
    }
    var takers = currentTakers = nextTakers;
    for (var i = 0, len = takers.length; i < len; i++) {
      var taker = takers[i];
      if (taker[MATCH](input)) {
        taker.cancel();
        taker(input);
      }
    }
  }, _ref.take = function take(cb, matcher2) {
    if (matcher2 === void 0) {
      matcher2 = wildcard;
    }
    if (true) {
      checkForbiddenStates();
    }
    if (closed) {
      cb(END);
      return;
    }
    cb[MATCH] = matcher2;
    ensureCanMutateNextTakers();
    nextTakers.push(cb);
    cb.cancel = once(function() {
      ensureCanMutateNextTakers();
      remove(nextTakers, cb);
    });
  }, _ref.close = close, _ref;
}
function stdChannel() {
  var chan = multicastChannel();
  var put = chan.put;
  chan.put = function(input) {
    if (input[SAGA_ACTION]) {
      put(input);
      return;
    }
    asap(function() {
      put(input);
    });
  };
  return chan;
}
var RUNNING = 0;
var CANCELLED2 = 1;
var ABORTED = 2;
var DONE = 3;
function resolvePromise(promise2, cb) {
  var cancelPromise = promise2[CANCEL];
  if (func(cancelPromise)) {
    cb.cancel = cancelPromise;
  }
  promise2.then(cb, function(error) {
    cb(error, true);
  });
}
var current = 0;
var nextSagaId = function() {
  return ++current;
};
var _effectRunnerMap;
function getIteratorMetaInfo(iterator2, fn) {
  if (iterator2.isSagaIterator) {
    return {
      name: iterator2.meta.name
    };
  }
  return getMetaInfo(fn);
}
function createTaskIterator(_ref) {
  var context = _ref.context, fn = _ref.fn, args = _ref.args;
  try {
    var result = fn.apply(context, args);
    if (iterator(result)) {
      return result;
    }
    var resolved = false;
    var next = function next2(arg) {
      if (!resolved) {
        resolved = true;
        return {
          value: result,
          done: !promise(result)
        };
      } else {
        return {
          value: arg,
          done: true
        };
      }
    };
    return makeIterator(next);
  } catch (err) {
    return makeIterator(function() {
      throw err;
    });
  }
}
function runPutEffect(env, _ref2, cb) {
  var channel3 = _ref2.channel, action = _ref2.action, resolve = _ref2.resolve;
  asap(function() {
    var result;
    try {
      result = (channel3 ? channel3.put : env.dispatch)(action);
    } catch (error) {
      cb(error, true);
      return;
    }
    if (resolve && promise(result)) {
      resolvePromise(result, cb);
    } else {
      cb(result);
    }
  });
}
function runTakeEffect(env, _ref3, cb) {
  var _ref3$channel = _ref3.channel, channel3 = _ref3$channel === void 0 ? env.channel : _ref3$channel, pattern = _ref3.pattern, maybe = _ref3.maybe;
  var takeCb = function takeCb2(input) {
    if (input instanceof Error) {
      cb(input, true);
      return;
    }
    if (isEnd(input) && !maybe) {
      cb(TERMINATE);
      return;
    }
    cb(input);
  };
  try {
    channel3.take(takeCb, notUndef(pattern) ? matcher(pattern) : null);
  } catch (err) {
    cb(err, true);
    return;
  }
  cb.cancel = takeCb.cancel;
}
function runCallEffect(env, _ref4, cb, _ref5) {
  var context = _ref4.context, fn = _ref4.fn, args = _ref4.args;
  var task = _ref5.task;
  try {
    var result = fn.apply(context, args);
    if (promise(result)) {
      resolvePromise(result, cb);
      return;
    }
    if (iterator(result)) {
      proc(
        env,
        result,
        task.context,
        current,
        getMetaInfo(fn),
        /* isRoot */
        false,
        cb
      );
      return;
    }
    cb(result);
  } catch (error) {
    cb(error, true);
  }
}
function runCPSEffect(env, _ref6, cb) {
  var context = _ref6.context, fn = _ref6.fn, args = _ref6.args;
  try {
    var cpsCb = function cpsCb2(err, res) {
      if (undef(err)) {
        cb(res);
      } else {
        cb(err, true);
      }
    };
    fn.apply(context, args.concat(cpsCb));
    if (cpsCb.cancel) {
      cb.cancel = cpsCb.cancel;
    }
  } catch (error) {
    cb(error, true);
  }
}
function runForkEffect(env, _ref7, cb, _ref8) {
  var context = _ref7.context, fn = _ref7.fn, args = _ref7.args, detached = _ref7.detached;
  var parent = _ref8.task;
  var taskIterator = createTaskIterator({
    context,
    fn,
    args
  });
  var meta = getIteratorMetaInfo(taskIterator, fn);
  immediately(function() {
    var child = proc(env, taskIterator, parent.context, current, meta, detached, void 0);
    if (detached) {
      cb(child);
    } else {
      if (child.isRunning()) {
        parent.queue.addTask(child);
        cb(child);
      } else if (child.isAborted()) {
        parent.queue.abort(child.error());
      } else {
        cb(child);
      }
    }
  });
}
function runJoinEffect(env, taskOrTasks, cb, _ref9) {
  var task = _ref9.task;
  var joinSingleTask = function joinSingleTask2(taskToJoin, cb2) {
    if (taskToJoin.isRunning()) {
      var joiner = {
        task,
        cb: cb2
      };
      cb2.cancel = function() {
        if (taskToJoin.isRunning()) remove(taskToJoin.joiners, joiner);
      };
      taskToJoin.joiners.push(joiner);
    } else {
      if (taskToJoin.isAborted()) {
        cb2(taskToJoin.error(), true);
      } else {
        cb2(taskToJoin.result());
      }
    }
  };
  if (array(taskOrTasks)) {
    if (taskOrTasks.length === 0) {
      cb([]);
      return;
    }
    var childCallbacks = createAllStyleChildCallbacks(taskOrTasks, cb);
    taskOrTasks.forEach(function(t, i) {
      joinSingleTask(t, childCallbacks[i]);
    });
  } else {
    joinSingleTask(taskOrTasks, cb);
  }
}
function cancelSingleTask(taskToCancel) {
  if (taskToCancel.isRunning()) {
    taskToCancel.cancel();
  }
}
function runCancelEffect(env, taskOrTasks, cb, _ref10) {
  var task = _ref10.task;
  if (taskOrTasks === SELF_CANCELLATION) {
    cancelSingleTask(task);
  } else if (array(taskOrTasks)) {
    taskOrTasks.forEach(cancelSingleTask);
  } else {
    cancelSingleTask(taskOrTasks);
  }
  cb();
}
function runAllEffect(env, effects, cb, _ref11) {
  var digestEffect = _ref11.digestEffect;
  var effectId = current;
  var keys = Object.keys(effects);
  if (keys.length === 0) {
    cb(array(effects) ? [] : {});
    return;
  }
  var childCallbacks = createAllStyleChildCallbacks(effects, cb);
  keys.forEach(function(key) {
    digestEffect(effects[key], effectId, childCallbacks[key], key);
  });
}
function runRaceEffect(env, effects, cb, _ref12) {
  var digestEffect = _ref12.digestEffect;
  var effectId = current;
  var keys = Object.keys(effects);
  var response = array(effects) ? createEmptyArray(keys.length) : {};
  var childCbs = {};
  var completed = false;
  keys.forEach(function(key) {
    var chCbAtKey = function chCbAtKey2(res, isErr) {
      if (completed) {
        return;
      }
      if (isErr || shouldComplete(res)) {
        cb.cancel();
        cb(res, isErr);
      } else {
        cb.cancel();
        completed = true;
        response[key] = res;
        cb(response);
      }
    };
    chCbAtKey.cancel = noop;
    childCbs[key] = chCbAtKey;
  });
  cb.cancel = function() {
    if (!completed) {
      completed = true;
      keys.forEach(function(key) {
        return childCbs[key].cancel();
      });
    }
  };
  keys.forEach(function(key) {
    if (completed) {
      return;
    }
    digestEffect(effects[key], effectId, childCbs[key], key);
  });
}
function runSelectEffect(env, _ref13, cb) {
  var selector = _ref13.selector, args = _ref13.args;
  try {
    var state = selector.apply(void 0, [env.getState()].concat(args));
    cb(state);
  } catch (error) {
    cb(error, true);
  }
}
function runChannelEffect(env, _ref14, cb) {
  var pattern = _ref14.pattern, buffer2 = _ref14.buffer;
  var chan = channel2(buffer2);
  var match = matcher(pattern);
  var taker = function taker2(action) {
    if (!isEnd(action)) {
      env.channel.take(taker2, match);
    }
    chan.put(action);
  };
  var close = chan.close;
  chan.close = function() {
    taker.cancel();
    close();
  };
  env.channel.take(taker, match);
  cb(chan);
}
function runCancelledEffect(env, data, cb, _ref15) {
  var task = _ref15.task;
  cb(task.isCancelled());
}
function runFlushEffect(env, channel3, cb) {
  channel3.flush(cb);
}
function runGetContextEffect(env, prop, cb, _ref16) {
  var task = _ref16.task;
  cb(task.context[prop]);
}
function runSetContextEffect(env, props, cb, _ref17) {
  var task = _ref17.task;
  assignWithSymbols(task.context, props);
  cb();
}
var effectRunnerMap = (_effectRunnerMap = {}, _effectRunnerMap[TAKE] = runTakeEffect, _effectRunnerMap[PUT] = runPutEffect, _effectRunnerMap[ALL] = runAllEffect, _effectRunnerMap[RACE] = runRaceEffect, _effectRunnerMap[CALL] = runCallEffect, _effectRunnerMap[CPS] = runCPSEffect, _effectRunnerMap[FORK] = runForkEffect, _effectRunnerMap[JOIN] = runJoinEffect, _effectRunnerMap[CANCEL2] = runCancelEffect, _effectRunnerMap[SELECT] = runSelectEffect, _effectRunnerMap[ACTION_CHANNEL] = runChannelEffect, _effectRunnerMap[CANCELLED] = runCancelledEffect, _effectRunnerMap[FLUSH] = runFlushEffect, _effectRunnerMap[GET_CONTEXT] = runGetContextEffect, _effectRunnerMap[SET_CONTEXT] = runSetContextEffect, _effectRunnerMap);
function forkQueue(mainTask, onAbort, cont) {
  var tasks = [];
  var result;
  var completed = false;
  addTask(mainTask);
  var getTasks = function getTasks2() {
    return tasks;
  };
  function abort(err) {
    onAbort();
    cancelAll();
    cont(err, true);
  }
  function addTask(task) {
    tasks.push(task);
    task.cont = function(res, isErr) {
      if (completed) {
        return;
      }
      remove(tasks, task);
      task.cont = noop;
      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }
        if (!tasks.length) {
          completed = true;
          cont(result);
        }
      }
    };
  }
  function cancelAll() {
    if (completed) {
      return;
    }
    completed = true;
    tasks.forEach(function(t) {
      t.cont = noop;
      t.cancel();
    });
    tasks = [];
  }
  return {
    addTask,
    cancelAll,
    abort,
    getTasks
  };
}
function formatLocation(fileName, lineNumber) {
  return fileName + "?" + lineNumber;
}
function effectLocationAsString(effect) {
  var location = getLocation(effect);
  if (location) {
    var code = location.code, fileName = location.fileName, lineNumber = location.lineNumber;
    var source = code + "  " + formatLocation(fileName, lineNumber);
    return source;
  }
  return "";
}
function sagaLocationAsString(sagaMeta) {
  var name = sagaMeta.name, location = sagaMeta.location;
  if (location) {
    return name + "  " + formatLocation(location.fileName, location.lineNumber);
  }
  return name;
}
function cancelledTasksAsString(sagaStack2) {
  var cancelledTasks = flatMap(function(i) {
    return i.cancelledTasks;
  }, sagaStack2);
  if (!cancelledTasks.length) {
    return "";
  }
  return ["Tasks cancelled due to error:"].concat(cancelledTasks).join("\n");
}
var crashedEffect = null;
var sagaStack = [];
var addSagaFrame = function addSagaFrame2(frame) {
  frame.crashedEffect = crashedEffect;
  sagaStack.push(frame);
};
var clear = function clear2() {
  crashedEffect = null;
  sagaStack.length = 0;
};
var setCrashedEffect = function setCrashedEffect2(effect) {
  crashedEffect = effect;
};
var toString = function toString2() {
  var firstSaga = sagaStack[0], otherSagas = sagaStack.slice(1);
  var crashedEffectLocation = firstSaga.crashedEffect ? effectLocationAsString(firstSaga.crashedEffect) : null;
  var errorMessage = "The above error occurred in task " + sagaLocationAsString(firstSaga.meta) + (crashedEffectLocation ? " \n when executing effect " + crashedEffectLocation : "");
  return [errorMessage].concat(otherSagas.map(function(s) {
    return "    created by " + sagaLocationAsString(s.meta);
  }), [cancelledTasksAsString(sagaStack)]).join("\n");
};
function newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont) {
  var _task;
  if (cont === void 0) {
    cont = noop;
  }
  var status = RUNNING;
  var taskResult;
  var taskError;
  var deferredEnd = null;
  var cancelledDueToErrorTasks = [];
  var context = Object.create(parentContext);
  var queue2 = forkQueue(mainTask, function onAbort() {
    cancelledDueToErrorTasks.push.apply(cancelledDueToErrorTasks, queue2.getTasks().map(function(t) {
      return t.meta.name;
    }));
  }, end);
  function cancel() {
    if (status === RUNNING) {
      status = CANCELLED2;
      queue2.cancelAll();
      end(TASK_CANCEL, false);
    }
  }
  function end(result, isErr) {
    if (!isErr) {
      if (result === TASK_CANCEL) {
        status = CANCELLED2;
      } else if (status !== CANCELLED2) {
        status = DONE;
      }
      taskResult = result;
      deferredEnd && deferredEnd.resolve(result);
    } else {
      status = ABORTED;
      addSagaFrame({
        meta,
        cancelledTasks: cancelledDueToErrorTasks
      });
      if (task.isRoot) {
        var sagaStack2 = toString();
        clear();
        env.onError(result, {
          sagaStack: sagaStack2
        });
      }
      taskError = result;
      deferredEnd && deferredEnd.reject(result);
    }
    task.cont(result, isErr);
    task.joiners.forEach(function(joiner) {
      joiner.cb(result, isErr);
    });
    task.joiners = null;
  }
  function setContext(props) {
    if (true) {
      check(props, object, createSetContextWarning("task", props));
    }
    assignWithSymbols(context, props);
  }
  function toPromise() {
    if (deferredEnd) {
      return deferredEnd.promise;
    }
    deferredEnd = redux_saga_deferred_esm_default();
    if (status === ABORTED) {
      deferredEnd.reject(taskError);
    } else if (status !== RUNNING) {
      deferredEnd.resolve(taskResult);
    }
    return deferredEnd.promise;
  }
  var task = (_task = {}, _task[TASK] = true, _task.id = parentEffectId, _task.meta = meta, _task.isRoot = isRoot, _task.context = context, _task.joiners = [], _task.queue = queue2, _task.cancel = cancel, _task.cont = cont, _task.end = end, _task.setContext = setContext, _task.toPromise = toPromise, _task.isRunning = function isRunning() {
    return status === RUNNING;
  }, _task.isCancelled = function isCancelled() {
    return status === CANCELLED2 || status === RUNNING && mainTask.status === CANCELLED2;
  }, _task.isAborted = function isAborted() {
    return status === ABORTED;
  }, _task.result = function result() {
    return taskResult;
  }, _task.error = function error() {
    return taskError;
  }, _task);
  return task;
}
function proc(env, iterator$1, parentContext, parentEffectId, meta, isRoot, cont) {
  if (iterator$1[asyncIteratorSymbol]) {
    throw new Error("redux-saga doesn't support async generators, please use only regular ones");
  }
  var finalRunEffect = env.finalizeRunEffect(runEffect);
  next.cancel = noop;
  var mainTask = {
    meta,
    cancel: cancelMain,
    status: RUNNING
  };
  var task = newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont);
  var executingContext = {
    task,
    digestEffect
  };
  function cancelMain() {
    if (mainTask.status === RUNNING) {
      mainTask.status = CANCELLED2;
      next(TASK_CANCEL);
    }
  }
  if (cont) {
    cont.cancel = task.cancel;
  }
  next();
  return task;
  function next(arg, isErr) {
    try {
      var result;
      if (isErr) {
        result = iterator$1.throw(arg);
        clear();
      } else if (shouldCancel(arg)) {
        mainTask.status = CANCELLED2;
        next.cancel();
        result = func(iterator$1.return) ? iterator$1.return(TASK_CANCEL) : {
          done: true,
          value: TASK_CANCEL
        };
      } else if (shouldTerminate(arg)) {
        result = func(iterator$1.return) ? iterator$1.return() : {
          done: true
        };
      } else {
        result = iterator$1.next(arg);
      }
      if (!result.done) {
        digestEffect(result.value, parentEffectId, next);
      } else {
        if (mainTask.status !== CANCELLED2) {
          mainTask.status = DONE;
        }
        mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.status === CANCELLED2) {
        throw error;
      }
      mainTask.status = ABORTED;
      mainTask.cont(error, true);
    }
  }
  function runEffect(effect, effectId, currCb) {
    if (promise(effect)) {
      resolvePromise(effect, currCb);
    } else if (iterator(effect)) {
      proc(
        env,
        effect,
        task.context,
        effectId,
        meta,
        /* isRoot */
        false,
        currCb
      );
    } else if (effect && effect[IO]) {
      var effectRunner = effectRunnerMap[effect.type];
      effectRunner(env, effect.payload, currCb, executingContext);
    } else {
      currCb(effect);
    }
  }
  function digestEffect(effect, parentEffectId2, cb, label) {
    if (label === void 0) {
      label = "";
    }
    var effectId = nextSagaId();
    env.sagaMonitor && env.sagaMonitor.effectTriggered({
      effectId,
      parentEffectId: parentEffectId2,
      label,
      effect
    });
    var effectSettled;
    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }
      effectSettled = true;
      cb.cancel = noop;
      if (env.sagaMonitor) {
        if (isErr) {
          env.sagaMonitor.effectRejected(effectId, res);
        } else {
          env.sagaMonitor.effectResolved(effectId, res);
        }
      }
      if (isErr) {
        setCrashedEffect(effect);
      }
      cb(res, isErr);
    }
    currCb.cancel = noop;
    cb.cancel = function() {
      if (effectSettled) {
        return;
      }
      effectSettled = true;
      currCb.cancel();
      currCb.cancel = noop;
      env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
    };
    finalRunEffect(effect, effectId, currCb);
  }
}
var RUN_SAGA_SIGNATURE = "runSaga(options, saga, ...args)";
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ": saga argument must be a Generator function!";
function runSaga(_ref, saga) {
  var _ref$channel = _ref.channel, channel3 = _ref$channel === void 0 ? stdChannel() : _ref$channel, dispatch = _ref.dispatch, getState = _ref.getState, _ref$context = _ref.context, context = _ref$context === void 0 ? {} : _ref$context, sagaMonitor = _ref.sagaMonitor, effectMiddlewares = _ref.effectMiddlewares, _ref$onError = _ref.onError, onError = _ref$onError === void 0 ? logError : _ref$onError;
  if (true) {
    check(saga, func, NON_GENERATOR_ERR);
  }
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var iterator$1 = saga.apply(void 0, args);
  if (true) {
    check(iterator$1, iterator, NON_GENERATOR_ERR);
  }
  var effectId = nextSagaId();
  if (sagaMonitor) {
    sagaMonitor.rootSagaStarted = sagaMonitor.rootSagaStarted || noop;
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop;
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop;
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop;
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop;
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop;
    sagaMonitor.rootSagaStarted({
      effectId,
      saga,
      args
    });
  }
  if (true) {
    if (notUndef(dispatch)) {
      check(dispatch, func, "dispatch must be a function");
    }
    if (notUndef(getState)) {
      check(getState, func, "getState must be a function");
    }
    if (notUndef(effectMiddlewares)) {
      var MIDDLEWARE_TYPE_ERROR = "effectMiddlewares must be an array of functions";
      check(effectMiddlewares, array, MIDDLEWARE_TYPE_ERROR);
      effectMiddlewares.forEach(function(effectMiddleware) {
        return check(effectMiddleware, func, MIDDLEWARE_TYPE_ERROR);
      });
    }
    check(onError, func, "onError passed to the redux-saga is not a function!");
  }
  var finalizeRunEffect;
  if (effectMiddlewares) {
    var middleware = compose.apply(void 0, effectMiddlewares);
    finalizeRunEffect = function finalizeRunEffect2(runEffect) {
      return function(effect, effectId2, currCb) {
        var plainRunEffect = function plainRunEffect2(eff) {
          return runEffect(eff, effectId2, currCb);
        };
        return middleware(plainRunEffect)(effect);
      };
    };
  } else {
    finalizeRunEffect = identity;
  }
  var env = {
    channel: channel3,
    dispatch: wrapSagaDispatch(dispatch),
    getState,
    sagaMonitor,
    onError,
    finalizeRunEffect
  };
  return immediately(function() {
    var task = proc(
      env,
      iterator$1,
      context,
      effectId,
      getMetaInfo(saga),
      /* isRoot */
      true,
      void 0
    );
    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task);
    }
    return task;
  });
}
function sagaMiddlewareFactory(_temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$context = _ref.context, context = _ref$context === void 0 ? {} : _ref$context, _ref$channel = _ref.channel, channel3 = _ref$channel === void 0 ? stdChannel() : _ref$channel, sagaMonitor = _ref.sagaMonitor, options = _objectWithoutPropertiesLoose(_ref, ["context", "channel", "sagaMonitor"]);
  var boundRunSaga;
  if (true) {
    check(channel3, channel, "options.channel passed to the Saga middleware is not a channel");
  }
  function sagaMiddleware(_ref2) {
    var getState = _ref2.getState, dispatch = _ref2.dispatch;
    boundRunSaga = runSaga.bind(null, _extends({}, options, {
      context,
      channel: channel3,
      dispatch,
      getState,
      sagaMonitor
    }));
    return function(next) {
      return function(action) {
        if (sagaMonitor && sagaMonitor.actionDispatched) {
          sagaMonitor.actionDispatched(action);
        }
        var result = next(action);
        channel3.put(action);
        return result;
      };
    };
  }
  sagaMiddleware.run = function() {
    if (!boundRunSaga) {
      throw new Error("Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware");
    }
    return boundRunSaga.apply(void 0, arguments);
  };
  sagaMiddleware.setContext = function(props) {
    if (true) {
      check(props, object, createSetContextWarning("sagaMiddleware", props));
    }
    assignWithSymbols(context, props);
  };
  return sagaMiddleware;
}
var redux_saga_core_esm_default = sagaMiddlewareFactory;

// node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js
var redux_saga_core_npm_proxy_esm_default = redux_saga_core_esm_default;
export {
  CANCEL,
  END,
  SAGA_LOCATION,
  buffers,
  channel2 as channel,
  redux_saga_core_npm_proxy_esm_default as default,
  detach,
  eventChannel,
  isEnd,
  multicastChannel,
  runSaga,
  stdChannel
};
//# sourceMappingURL=redux-saga.js.map
