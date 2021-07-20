package edu.hm.cs.keycloak.form;

import org.keycloak.OAuth2Constants;
import org.keycloak.authentication.RequiredActionContext;
import org.keycloak.authentication.RequiredActionProvider;
import org.keycloak.authentication.requiredactions.TermsAndConditions;
import org.keycloak.common.util.Time;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.UserManager;

import java.util.Arrays;

public class TermsAndConditionsGDPR extends TermsAndConditions {
    public static final String PROVIDER_ID = "terms_and_conditions_gdpr";
    public static final String USER_ATTRIBUTE = PROVIDER_ID;

    @Override
    public RequiredActionProvider create(KeycloakSession session) {
        return this;
    }

    @Override
    public RequiredActionProvider createDisplay(KeycloakSession session, String displayType) {
        if (displayType == null) return this;
        if (!OAuth2Constants.DISPLAY_CONSOLE.equalsIgnoreCase(displayType)) return null;
        return ConsoleTermsAndConditionsGDPR.SINGLETON;
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    public void processAction(RequiredActionContext context) {
        if (context.getHttpRequest().getDecodedFormParameters().containsKey("cancel")) {
            context.getUser().removeAttribute(USER_ATTRIBUTE);

            new UserManager(context.getSession()).removeUser(context.getRealm(), context.getUser());

            context.failure();
            return;
        }

        context.getUser().setAttribute(USER_ATTRIBUTE, Arrays.asList(Integer.toString(Time.currentTime())));

        context.success();
    }

    @Override
    public String getDisplayText() {
        return "Terms and Conditions GDPR";
    }
}