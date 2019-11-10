# adapt-lottie  

**adapt-lottie** is a component that allows the bodymovin After Effects plugin to be used in Adapt learning courses.  


## Installation

It may be installed with the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:  
`adapt install adapt-lottie`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-lottie": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **adapt-lottie** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  
<div float align=right><a href="#top">Back to Top</a></div>

## Settings Overview

The attributes listed below are used in *components.json* to configure **Text**, and are properly formatted as JSON in [*example.json*](https://github.com/dancgray/adapt-lottie/blob/master/example.json).

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `lottie`.

**_classes** (string): CSS class name to be applied to **adapt-lottie**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**title** (string): A reference title for the component. **title** is distinct from the **displayTitle** which, if present, appears above the component. **title** provides the opportunity to use a shortened form in tighter spaces, such as in menus or in the drawer.  

**displayTitle** (string): Optional text that will display as a title or header above the component. It can be used as a headline.   

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.

**body** (string): Although optional, this text constitutes what is thought of as the primary *text* of the **Text** component. HTML is permitted.  
<div float align=right><a href="#top">Back to Top</a></div>

## Limitations

To be updated


----------------------------
**Version number:**  0.9.0  
**Framework versions:** 4+  
**Author / maintainer:** [Dan Gray](https://github.com/dancgray)   
**Accessibility support:** Working / To be confirmed   
**RTL support:** To be confirmed  
**Cross-platform coverage:** To be confirmed
