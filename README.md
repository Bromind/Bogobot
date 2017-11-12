# Bogobot !

This bot helps you to manage the interactions between medical staff and patients in an hospital. 


## Patient side

When a patient connects, the bot first inform the patient wether he should go to his doctor or if he should come to the emergency service. If his state requires emergency services (like broken leg), he can pre-fill his admission form before actually arriving at the hospital, in order to fasten his admission once arrived.

If he already came previously, his identity record are reused.

## Medical staff side

The medical staff manages patients. When a patient (with his prefill admission-form) arrives, a doctor can install him in a room, meaning that he takes him as a medical staff referent, and discharge the patient when he leaves the hospital. He can look at all his patient (asking for the list of its patient), and then get more infos about a particular one (like the identity information, symptoms, pain, plots, etc...).
