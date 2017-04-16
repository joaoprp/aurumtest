import org.junit.Assert;
import org.junit.Before;
import org.junit.After;
import org.junit.Test;

import org.hamcrest.CoreMatchers;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.cache.AsyncCacheFilter;


import br.com.aurum.astrea.dao.ContactDao;
import br.com.aurum.astrea.domain.Contact;
import java.util.List;
import java.util.ArrayList;

public class ContactDaoTest {

    private final LocalServiceTestHelper helper = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    private ContactDao d;

    @Before
    public void setUp() {
        helper.setUp();
        d = new ContactDao();
    }

    @Test
    public void listTestCase() {
        List<Contact> lc = new ArrayList<Contact>();
        Assert.assertEquals(lc,d.list());
    }

    @Test
    public void saveTestCase() {
        Contact c = new Contact();

        c.setName("Test");
        c.setBirthDay("1");
        c.setBirthMonth("1");
        c.setBirthYear("1990");

        d.save(c);

        Assert.assertEquals(c.getName(),d.list().get(0).getName());
    }

    @Test
    public void getTestCase() {
        Contact c = new Contact();

        c.setName("Test");
        c.setBirthDay("1");
        c.setBirthMonth("1");
        c.setBirthYear("1990");

        d.save(c);

        Assert.assertEquals("Test",d.get(d.list().get(0).getId()).getName());
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }

}