Combinator
==========

Advanced build system

Motivation

Modern software is very complex system, consisting of multiple parts and depending on various 3rd party libraries. However, most continuous itegration systems completely ignore that fact, providing very limited capability to integrate component when it's dependencies were changed, even though it supposed to be it's primary concern.

Consider the dependency graph below.


![dependencies](https://github.com/slmoloch/Combinator/blob/master/doc/deps.png)


Whenever any of components changes it's version, all downstream dependencies need to be integrated with the new version in their "commit" pipelines and ultimately the whole system needs to be pushed to "integration" pipeline, which will serve as primary instrument for continuous delivery 

The first iteration of design revealed following actors in system

1) Component
     A piece of software, of an particular version, which depends on other components

2) Artifactory
     Gives access to component packages.

3) Dispatcher
     keeps track on components in system and triggers production of downstream dependencies if the version had changed.

4) Runner
     Executes pipeline  
     
![components](https://github.com/slmoloch/Combinator/blob/master/doc/components.png)
     
     
     


