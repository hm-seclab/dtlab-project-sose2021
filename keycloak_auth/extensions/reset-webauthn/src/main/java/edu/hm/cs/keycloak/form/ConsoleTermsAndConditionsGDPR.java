package edu.hm.cs.keycloak.form;

import org.keycloak.authentication.RequiredActionContext;
import org.keycloak.authentication.requiredactions.ConsoleTermsAndConditions;
import org.keycloak.common.util.Time;

import java.util.Arrays;

public class ConsoleTermsAndConditionsGDPR extends ConsoleTermsAndConditions {
    public static final ConsoleTermsAndConditionsGDPR SINGLETON = new ConsoleTermsAndConditionsGDPR();
    public static final String USER_ATTRIBUTE = TermsAndConditionsGDPR.PROVIDER_ID;

    @Override
    public void processAction(RequiredActionContext context) {
        String accept = context.getHttpRequest().getDecodedFormParameters().getFirst("accept");

        String yes = context.form().getMessage("console-accept");

        if (!accept.equals(yes)) {
            context.getUser().removeAttribute(USER_ATTRIBUTE);
            requiredActionChallenge(context);
            return;
        }

        context.getUser().setAttribute(USER_ATTRIBUTE, Arrays.asList(Integer.toString(Time.currentTime())));

        context.success();
    }
}
