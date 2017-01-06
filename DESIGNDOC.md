# Design Doc

> A retrospective and future plans for the SPA.

## TODO

**Refactor to be more modular**

The current architecture is far too monolithic for my taste. The first step I
would take is to extract some functionality out of `main.js` into other modules.

**Refactor into abstract solution**

The form is currently very dependent on a hard-coded ordering. I'd like to
abstract the form to support an arbitrary ordering of fields and support many
types of fields as well. This problem (later fields require earlier fields) is a
general problem that could be solved abstractly, then that solution could be
applied here for Cars and elsewhere just as easily.

**Improve UI/UX**

The user experience is pretty poor in the SPA. The form is pretty
straight-forward but has little in the way of soft-corners. The error messages
could also be improved in both location and description.
